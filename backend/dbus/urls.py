from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

urlpatterns = [path('route/<str:route_id>/', views.route, name='route')]

router = DefaultRouter()  # 创建路由器
router.register(r'stops', views.StopViewSet)  # 注册路由指定路由前缀和指定视图集
urlpatterns += router.urls  # 把路由器生成好的路由追加到路由列表中