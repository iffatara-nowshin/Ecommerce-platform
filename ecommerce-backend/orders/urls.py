from django.urls import path
from .views import CreateOrderAPIView, MyOrdersAPIView

urlpatterns = [
    path("create/", CreateOrderAPIView.as_view(), name="order-create"),
    path("my/", MyOrdersAPIView.as_view(), name="my-orders"),
]
