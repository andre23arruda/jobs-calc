from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import JobSerializer, ProfileSerializer, UserSerializer
from .models import Job, Profile


class JobViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Jobs to be viewed or edited.'''
    serializer_class = JobSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    # search_fields = ['titulo', 'name']
    filterset_fields = ['created_at']
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        query_set = user.profile.jobs.all()
        return query_set

    def create(self, request, *args, **kwargs):
        '''Create Job instance'''
        user = request.user
        request.data.update({'user': user.profile.id})
        return super().create(request, *args, **kwargs)

    def destroy(self, request, pk=None):
        '''Destroy Job instance'''
        user = request.user
        instance = self.get_object()
        if instance.user == user.profile:
            instance.delete()
            return Response(
            {'data': _('Job deleted!')},
            status=status.HTTP_204_NO_CONTENT
        )
        return Response(
            {'data': _('You can not delete this job!')},
            status=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        '''Update Job instance'''
        user = request.user
        request.data.update({'user': user.profile.id})
        return super().update(request, *args, **kwargs)


class ProfileViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Profiles to be viewed or edited.'''
    serializer_class = ProfileSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    # search_fields = ['titulo', 'name']
    filterset_fields = ['created_at']
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        query_set = []
        if hasattr(user, 'profile'):
            query_set = [user.profile]
        return query_set

    def update(self, request, *args, **kwargs):
        '''Update Profile instance'''
        user = request.user
        profile = user.profile
        data = request.data

        name = data.pop('name')
        user.first_name = name
        user.save()

        for (key, value) in data.items():
            setattr(profile, key, value)
        profile.save()
        response = ProfileSerializer(profile)
        return Response(
            response.data,
            status=status.HTTP_200_OK
        )


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []
