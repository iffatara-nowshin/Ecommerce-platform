from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse, HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# ============ Solution 1: JSON Response (Simple) ============
def api_home(request):
    return JsonResponse({
        "message": "🛒 E-Commerce API is running",
        "version": "1.0.0",
        "endpoints": {
            "admin_panel": "http://127.0.0.1:8000/admin/",
            "store_api": "http://127.0.0.1:8000/api/store/",
            "auth_login": "http://127.0.0.1:8000/api/auth/login/",
            "auth_refresh": "http://127.0.0.1:8000/api/auth/refresh/",
            "orders_api": "http://127.0.0.1:8000/api/orders/",
        },
        "frontend": "http://localhost:3000",
        "instructions": "Go to /admin/ to add products first"
    })

# ============ Solution 2: Beautiful HTML Page ============
def home_page(request):
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-Commerce API</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 1000px;
                width: 100%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
            }
            .header h1 {
                color: #333;
                font-size: 2.5rem;
                margin-bottom: 10px;
            }
            .header p {
                color: #666;
                font-size: 1.1rem;
            }
            .status {
                background: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .status::before {
                content: "✓";
                background: #28a745;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }
            .endpoints {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .endpoint-card {
                background: #f8f9fa;
                border-left: 5px solid #4285f4;
                padding: 20px;
                border-radius: 10px;
                transition: transform 0.3s;
            }
            .endpoint-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .endpoint-card h3 {
                color: #333;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .endpoint-card a {
                color: #1a73e8;
                text-decoration: none;
                font-weight: 500;
                word-break: break-all;
                display: block;
                margin-bottom: 5px;
            }
            .endpoint-card a:hover {
                text-decoration: underline;
            }
            .instructions {
                background: #fff3cd;
                border-left: 5px solid #ffc107;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 30px;
            }
            .instructions h3 {
                color: #856404;
                margin-bottom: 10px;
            }
            .instructions ol {
                padding-left: 20px;
                color: #856404;
            }
            .instructions li {
                margin-bottom: 8px;
            }
            .btn {
                display: inline-block;
                background: #4285f4;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: background 0.3s;
                margin-right: 10px;
            }
            .btn:hover {
                background: #3367d6;
            }
            .btn.admin {
                background: #0f9d58;
            }
            .btn.admin:hover {
                background: #0b8043;
            }
            .btn.frontend {
                background: #db4437;
            }
            .btn.frontend:hover {
                background: #c23321;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 0.9rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛒 E-Commerce Backend API</h1>
                <p>Django REST Framework + React.js Full Stack Application</p>
            </div>
            
            <div class="status">
                ✅ Server is running successfully on port 8000
            </div>
            
            <div class="endpoints">
                <div class="endpoint-card">
                    <h3>🔐 Admin Panel</h3>
                    <a href="/admin/" target="_blank">http://127.0.0.1:8000/admin/</a>
                    <p><small>Username: <strong>admin</strong> | Password: <strong>1234</strong></small></p>
                </div>
                
                <div class="endpoint-card">
                    <h3>🛍️ Store API</h3>
                    <a href="/api/store/" target="_blank">http://127.0.0.1:8000/api/store/</a>
                    <p><small>Products, Categories, Inventory</small></p>
                </div>
                
                <div class="endpoint-card">
                    <h3>🔑 Authentication</h3>
                    <a href="/api/auth/login/" target="_blank">http://127.0.0.1:8000/api/auth/login/</a>
                    <p><small>JWT Token Authentication</small></p>
                </div>
                
                <div class="endpoint-card">
                    <h3>📦 Orders API</h3>
                    <a href="/api/orders/" target="_blank">http://127.0.0.1:8000/api/orders/</a>
                    <p><small>Order Management System</small></p>
                </div>
            </div>
            
            <div class="instructions">
                <h3>🚀 Getting Started Guide</h3>
                <ol>
                    <li>Click "Admin Panel" button below to login</li>
                    <li>Add Categories from the Admin Panel</li>
                    <li>Add Products with images, price, and stock</li>
                    <li>Open React frontend at localhost:3000</li>
                    <li>Test API endpoints using Postman or Thunder Client</li>
                </ol>
            </div>
            
            <div style="text-align: center;">
                <a href="/admin/" class="btn admin">🔐 Open Admin Panel</a>
                <a href="http://localhost:3000" target="_blank" class="btn frontend">🌐 Open Frontend</a>
                <a href="/api/store/" class="btn">📡 Test API</a>
            </div>
            
            <div class="footer">
                <p>Backend: Django REST Framework | Frontend: React.js | Database: SQLite/PostgreSQL</p>
                <p>Developed with ❤️ by Your Team</p>
            </div>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html_content)

# ============ Choose one solution ============
# Use either api_home (JSON) or home_page (HTML)

urlpatterns = [
    path("", home_page, name="home"),  # ← এখানে Solution 2 ব্যবহার করছি (HTML page)
    # path("", api_home, name="api_home"),  # ← অথবা Solution 1 (JSON response)
    path("admin/", admin.site.urls),
    path("api/store/", include("store.urls")),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/orders/", include("orders.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)