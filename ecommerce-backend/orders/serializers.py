from rest_framework import serializers
from .models import Order, OrderItem
from store.models import Product

class OrderItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

class OrderCreateSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=30)
    address = serializers.CharField()
    items = OrderItemCreateSerializer(many=True)

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("Order items required.")
        return items

    def create(self, validated_data):
        user = self.context["request"].user
        items_data = validated_data.pop("items")

        order = Order.objects.create(user=user, **validated_data)

        total = 0
        for item in items_data:
            product = Product.objects.get(id=item["product_id"])
            qty = item["quantity"]
            price = product.price

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=qty,
                price=price,
            )

            total += (qty * price)

        order.total_amount = total
        order.save()
        return order


class OrderItemReadSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_slug = serializers.CharField(source="product.slug", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "product_slug", "quantity", "price", "line_total"]


class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "full_name", "phone", "address", "total_amount", "is_paid", "status", "created_at", "items"]
