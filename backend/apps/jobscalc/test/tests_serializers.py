from django.test import TestCase
from rest_framework import status
from jobscalc.models import Letter
from jobscalc.serializers import LetterSerializer

class LettersTestCase(TestCase):
    '''Letter Test Serializer'''

    def setUp(self): # cenário de teste
        self.letter = Letter(
            name='Joãozinho',
            title='Minha cartinha de Natal',
            message='Eu só queria um presente!!'
        )
        self.serializer = LetterSerializer(instance=self.letter)


    def test_para_verificar_campos_serializados(self):
        '''Teste para verificar os campos que estão sendo serializados'''
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(['id', 'name','created_at','updated_at','title','message',]))

    def test_para_verificar_conteudo_dos_campos_serializados(self):
        '''Teste para verificar o conteúdos dos campos serializados'''
        data = self.serializer.data
        self.assertEqual(data['name'], self.letter.name)
        self.assertEqual(data['created_at'], self.letter.created_at)
        self.assertEqual(data['updated_at'], self.letter.updated_at)
        self.assertEqual(data['title'], self.letter.title)
        self.assertEqual(data['message'], self.letter.message)
