import logging

from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.exceptions import NotFound
from rest_framework.viewsets import ReadOnlyModelViewSet

from vzhuh.models import Vzhuh
from vzhuh.serializers import VzhuhSerializer


logger = logging.getLogger(__name__)

vzhuh_settings = {
    "name": "Вжухи",
    "description": "Список актуальных спецпредложений по направлениям",
}


@extend_schema_view(
    list=extend_schema(summary="Список Вжухов", tags=["Вжухи"], operation_id="vzhuh_list"),
    retrieve=extend_schema(summary="Детальный просмотр Вжуха", tags=["Вжухи"], operation_id="vzhuh_detail"),
)
class VzhuhViewSet(ReadOnlyModelViewSet):
    """Получение списка и конкретного вжуха (только GET)."""

    queryset = Vzhuh.objects.filter(is_published=True)
    serializer_class = VzhuhSerializer

    def get_object(self):
        try:
            obj = super().get_object()
            logger.debug(f"Retrieved object: {obj}")
            return obj
        except Exception as e:
            logger.error(f"Exception in get_object: {e}")
            raise NotFound(detail="Упс! Такого Вжуха не существует 🤷‍♀️", code=404)
