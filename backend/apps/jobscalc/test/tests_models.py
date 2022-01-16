from django.test import TestCase
from jobscalc.models import Letter
from datetime import date


class LettersTestCase(TestCase):

    def setUp(self): # cenário de teste
        self.letter = Letter.objects.create(
            name='Joãozinho',
            title='Minha cartinha de Natal',
            message='Eu só queria um presente!!'
        )

    def test_para_verificar_atributos_de_letter(self):
        '''Teste para verificar se os atributos de letter estão corretos'''
        self.assertEqual(self.letter.name,'Joãozinho')
        self.assertEqual(self.letter.created_at, date.today())
        self.assertEqual(self.letter.updated_at, date.today())
        self.assertEqual(self.letter.title, 'Minha cartinha de Natal')
        self.assertEqual(self.letter.message, 'Eu só queria um presente!!')
