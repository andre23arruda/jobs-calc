from django.urls import path, include
from django.utils.html import format_html

from rest_framework import routers
from rest_framework import permissions
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from apps.jobscalc.views import JobViewSet, ProfileViewSet, UserCreateView

# routers API
router = routers.DefaultRouter()
router.register('jobs', JobViewSet, basename='Jobs')
router.register('profiles', ProfileViewSet, basename='Profiles')

# doc configuration
schema_view = get_schema_view(
    openapi.Info(
        title='Cartinhas de Natal Zappts - API',
        default_version='v0.1',
        description=format_html('''
            <h1 style="margin-top:50px; text-align: center">Documentação para o teste técnico da Zappts<h1>
            <h2>Autenticação JWT para acesso aos endpoints</h2>
            <p>Você pode testar a criação do token executando no seu terminal o comando abaixo:</p>
            <pre>
            <code>
            $ curl -X POST -d "username=zappts&password=teste123" https://andre23arruda-zappts.herokuapp.com/login/
            </code>
            </pre>

            <p style="font-weight: bolder; color: red;">
                O sistema irá te retornar o token para acesso ao sistema.
                Agora, para acessar as APIs protegidas, você deve incluir no Headers da requisição o <strong>Authorization: JWT SEU_TOKEN</strong></p>
            <p>

            <h2>Atualizar Token</h2>
            <p>Os tokens expiram em 300 segundos. Para evitar a expiração é necessário atualizar fazendo uma requisição no endpoint <i>/refresh-token</i>: </p>
            <pre>
            <code>
            $ curl -X POST -H "Content-Type: application/json" -d '{{"token":"TOKEN_EXISTENTE"}}' https://andre23arruda-zappts.herokuapp.com/refresh-token/
            </code>
            </pre>

            <span style="font-weight: bolder; color: red;">Apenas tokens não expirados serão atualizados. Se o token estiver expirado, será necessário fazer login novamente.</span>

        '''),
        contact=openapi.Contact(email='andre23arruda@gmail.com'),
        license=openapi.License(name='BSD License'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

api_urlpatterns = [
    path('api/', include(router.urls)),
    path('api/signup/', UserCreateView.as_view()),
    path('api/login/', obtain_jwt_token, name='login-jwt'),
    path('api/refresh-token/', refresh_jwt_token),
    path('api/doc/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/doc/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]