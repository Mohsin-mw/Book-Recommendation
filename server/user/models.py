from django.db import models


# Create your models here.
class User(models.Model):
    class Meta:
        db_table = 'users'

    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=500)
    clerk_id = models.CharField(max_length=500)

    def __str__(self):
        return self.username