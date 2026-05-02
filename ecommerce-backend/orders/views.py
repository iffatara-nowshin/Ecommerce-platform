from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderCreateSerializer, OrderReadSerializer

class CreateOrderAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderCreateSerializer

class MyOrdersAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderReadSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-id")

