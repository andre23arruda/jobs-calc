from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework_jwt.settings import api_settings

from rest_framework.test import APITestCase
from rest_framework import status

from jobscalc.models import Letter


class UserAuthenticationTestCase(APITestCase):

    def setUp(self): # cenário de teste
        self.letter = Letter.objects.create(
            name='Joãozinho',
            title='Minha cartinha de Natal',
            message='Eu só queria um presente!!'
        )
        self.user = User.objects.create_user(username='user_teste', password='123')
        self.list_url = reverse('Letters-list')
        self.login_url = reverse('login-jwt')
        self.jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        self.jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    def test_autenticacao_user_token(self):
        '''Teste para verificar se o token de autenticação é criado'''
        payload = self.jwt_payload_handler(self.user)
        token = self.jwt_encode_handler(payload)
        self.assertTrue(token is not None)

    def test_autenticacao_user_token_nao_foi_gerado(self):
        '''Teste para verificar se o token de autenticação não foi criado, pois o usuário não existe'''
        user = User.objects.filter(username='user_teste_1').first() # usuário não existe
        token = None
        try:
            payload = self.jwt_payload_handler(user)
            token = self.jwt_encode_handler(payload)
        except:
            pass
        self.assertTrue(token is None)

    def test_login_user(self):
        '''Teste para verificar se o login gera token'''
        data = {
            'username': 'user_teste',
            'password': '123',
        }
        response = self.client.post(self.login_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)


    def test_login_user_error(self):
        '''Teste para verificar se o login deu erro'''
        data = {
            'username': 'user_teste',
            'password': '1234',
        }
        response = self.client.post(self.login_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_requisicao_get_sem_token_de_usuario(self):
        '''Teste para verificar se é possível fazer requisição GET sem token de usuário'''
        response = self.client.get(self.list_url)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_requisicao_get_com_token_de_usuario(self):
        '''Teste para verificar se é possível fazer requisição GET com token do usuário'''
        payload = self.jwt_payload_handler(self.user)
        token = 'JWT ' + self.jwt_encode_handler(payload) # cria token
        self.client.credentials(HTTP_AUTHORIZATION=token)
        response = self.client.get(self.list_url)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_requisicao_post_sem_token_de_usuario(self):
        '''Teste para verificar se é possível fazer requisição POST sem token do usuário'''
        data = {
            'name': 'teste teste',
            'title': 'teste teste',
            'message': 'teste teste'
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_requisicao_post_com_token_de_usuario(self):
        '''Teste para verificar se é possível fazer requisição POST com token do usuário'''
        data = {
            'name': 'teste teste',
            'title': 'teste teste',
            'message': 'teste teste'
        }
        payload = self.jwt_payload_handler(self.user)
        token = 'JWT ' + self.jwt_encode_handler(payload) # cria token
        self.client.credentials(HTTP_AUTHORIZATION=token)
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_requisicao_put_para_atualizar_letter_sem_token_de_usuario(self):
        '''Teste para verificar a requisição PUT para atualizar um Letter sem token de usuário'''
        data = {
            'name': 'teste teste',
            'title': 'teste teste',
            'message': 'teste teste'
        }
        response = self.client.put(self.list_url + '1/', data)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_requisicao_put_para_atualizar_letter_com_token_de_usuario(self):
        '''Teste para verificar a requisição PUT para atualizar um Letter com token de usuário'''
        data = {
            'name': 'teste teste',
            'title': 'teste teste',
            'message': 'teste teste'
        }
        payload = self.jwt_payload_handler(self.user)
        token = 'JWT ' + self.jwt_encode_handler(payload) # cria token
        self.client.credentials(HTTP_AUTHORIZATION=token)
        response = self.client.put(self.list_url + '1/', data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_requisicao_delete_para_excluir_letter_sem_token_de_usuario(self):
        '''Teste para verificar a requisição DELETE para excluir um Letter sem token de usuário'''
        response = self.client.delete(self.list_url + '1/')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_requisicao_delete_para_atualizar_letter_com_token_de_usuario(self):
        '''Teste para verificar a requisição DELETE para excluir um Letter com token de usuário'''
        payload = self.jwt_payload_handler(self.user)
        token = 'JWT ' + self.jwt_encode_handler(payload) # cria token
        self.client.credentials(HTTP_AUTHORIZATION=token)
        response = self.client.delete(self.list_url + '1/')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
