from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

urlpatterns = [path('stop_info/<str:stop_id>/', views.StopInfo, name='stop_info'),
               path('stops_in_trip/<str:trip_id>/', views.StopsInTrip, name='stops_in_trip'),
               path('shape_of_trip/<str:trip_id>/', views.ShapeOfTrip, name='shape_of_trip'),
               path('trips_in_route/<str:route_id>/', views.TripsInRoute, name='trips_in_route'),
               path('lines/', views.Lines, name='lines'),]

router = DefaultRouter()  # 创建路由器
router.register(r'stops', views.StopViewSet)  # 注册路由指定路由前缀和指定视图集
# router.register(r'stop_in_trip', views.StopInTripViewSet)  # 注册路由指定路由前缀和指定视图集
urlpatterns += router.urls  # 把路由器生成好的路由追加到路由列表中