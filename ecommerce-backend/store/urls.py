# store/urls.py
from django.urls import path
from .views import (
    CategoryListAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    ProductCreateAPIView,      # নতুন import
    ProductUpdateAPIView,      # নতুন import
    ProductDeleteAPIView,      # নতুন import
)

urlpatterns = [
    # Existing URLs
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailAPIView.as_view(), name='product-detail'),
    
    # New URLs for product management
    path('products/create/', ProductCreateAPIView.as_view(), name='product-create'),
    path('products/<slug:slug>/update/', ProductUpdateAPIView.as_view(), name='product-update'),
    path('products/<slug:slug>/delete/', ProductDeleteAPIView.as_view(), name='product-delete'),
]