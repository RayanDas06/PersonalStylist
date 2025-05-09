import axios from 'axios';

const PRICE_API_KEY = process.env.REACT_APP_PRICE_API_KEY;
const PRICE_API_BASE_URL = 'https://api.priceapi.com/v2/jobs';
const MAX_REQUESTS_PER_DAY = 10; // Limit API calls to 10 per day
let requestCount = 0;

interface PriceApiResponse {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
  style: string[];
  store: string;
  url: string;
}

export const searchClothingItems = async (style: string): Promise<PriceApiResponse[]> => {
  try {
    // Check if we've exceeded the daily limit
    if (requestCount >= MAX_REQUESTS_PER_DAY) {
      console.error('Daily API request limit reached');
      return [];
    }

    console.log('Making request to PriceAPI with key:', PRICE_API_KEY ? 'Key exists' : 'No key found');
    console.log(`API calls remaining today: ${MAX_REQUESTS_PER_DAY - requestCount}`);
    
    // Format values as a newline-separated string
    const values = `${style} clothing\nfashion\n10`;
    
    const requestBody = {
      key: 'term',
      token: PRICE_API_KEY,
      source: 'amazon',
      country: 'us',
      topic: 'search_results',
      values: values
    };
    
    // Log the request body without the actual API key for security
    const safeRequestBody = { ...requestBody, token: '***' };
    console.log('PriceAPI request body:', safeRequestBody);
    
    const response = await axios.post(
      PRICE_API_BASE_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('PriceAPI full response:', response.data);

    // Check if we have a valid response structure
    if (!response.data) {
      console.error('No data in response');
      return [];
    }

    // Check if we have a job ID (this API is asynchronous)
    if (response.data.job_id) {
      console.log('Job created with ID:', response.data.job_id);
      // We need to poll for results
      const jobId = response.data.job_id;
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        attempts++;
        console.log(`Polling attempt ${attempts} for job ${jobId}`);
        
        const jobResponse = await axios.get(`${PRICE_API_BASE_URL}/${jobId}`, {
          params: {
            token: PRICE_API_KEY
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const jobData = jobResponse.data;
        console.log('Job status:', jobData.status);
        
        if (jobData.status === 'finished') {
          // Make a separate request to get the products
          const productsResponse = await axios.get(`${PRICE_API_BASE_URL}/${jobId}/download`, {
            params: {
              token: PRICE_API_KEY
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Products response structure:', Object.keys(productsResponse.data));
          console.log('Products response:', JSON.stringify(productsResponse.data, null, 2));

          // Extract and flatten all search_results arrays from results[].content.search_results
          const results = productsResponse.data.results || [];
          const allSearchResults = results.flatMap((result: any) => {
            if (result.content && Array.isArray(result.content.search_results)) {
              return result.content.search_results;
            }
            return [];
          });

          if (allSearchResults.length > 0) {
            requestCount++; // Increment the request counter
            console.log(`API calls remaining today: ${MAX_REQUESTS_PER_DAY - requestCount}`);
            
            // Transform the search results to match our ClothingItem interface
            const transformedItems = allSearchResults.map((product: any) => ({
              id: product.id || String(Math.random()),
              name: product.name || 'Unknown Product',
              brand: product.brand_name || 'Unknown',
              price: parseFloat(product.min_price) || 0,
              imageUrl: product.image_url || 'https://via.placeholder.com/400x300',
              category: product.type || 'fashion',
              style: [style],
              store: 'Amazon',
              url: product.url || '#'
            }));

            console.log('Transformed items:', transformedItems);
            return transformedItems;
          } else {
            console.error('No products found in search_results');
          }
        } else if (jobData.status === 'failed') {
          console.error('Job failed:', jobData);
          return [];
        } else if (jobData.status === 'processing') {
          console.log('Job still processing...');
        } else {
          console.log('Unknown job status:', jobData.status);
        }
        
        // Wait 2 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      console.error('Max polling attempts reached');
      return [];
    }

    console.error('Unexpected response structure:', response.data);
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('PriceAPI Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
}; 