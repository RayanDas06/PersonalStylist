INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'accounts',
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True  # Later restrict to your frontend domain

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
