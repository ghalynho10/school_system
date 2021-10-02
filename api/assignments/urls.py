from rest_framework.routers import DefaultRouter
from api.views import AssignmentViewset

router = DefaultRouter()
router.register(r'', AssignmentViewset, basename='assignments')

urlpatterns = router.urls
