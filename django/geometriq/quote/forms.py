from django import forms
from django.forms import ModelForm, TextInput
from .models import *

class ThreeDModelForm(forms.ModelForm):
    class Meta:
        model = ThreeDModel
        fields = ('model_file',)

class ThreeDModelSpecificationForm(forms.ModelForm):
    class Meta:
        model = ThreeDModel
        fields = ['material', 'tolerance', 'notes', 'custom']
        # widgets = {
        #     'notes': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px;',
        #         'placeholder': 'notes'
        #         }),
        #     'custom': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px;',
        #         'placeholder': 'custom'
        #         }),
            
        # }

    def __init__(self, *args, **kwargs):
        super(ThreeDModelSpecificationForm, self).__init__(*args, **kwargs)
        
        # Define choices for the material dropdown menu
        material_choices = (
            ('option1', 'Staal'),
            ('option2', 'Alluminium'),
            ('option3', 'POM'),
        )
        
        # Define choices for the tolerance dropdown menu
        tolerance_choices = (
            ('tolerance1', 'ISO 2768 Medium (m)'),
            ('tolerance2', 'ISO 2768 Fine (f)'),
            
        )
        
        # Set the choices for the material and tolerance fields
        self.fields['material'].widget = forms.Select(choices=material_choices)
        self.fields['tolerance'].widget = forms.Select(choices=tolerance_choices)

class PriceForm(forms.ModelForm):
    class Meta:
        model = ThreeDModel
        fields = ['fast', 'normal', 'economy']
        # widgets = {
        #     'notes': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px;',
        #         'placeholder': 'notes'
        #         }),
        #     'custom': TextInput(attrs={
        #         'class': "form-control",
        #         'style': 'max-width: 300px;',
        #         'placeholder': 'custom'
        #         }),
            
        # }

    def __init__(self, *args, **kwargs):
        super(PriceForm, self).__init__(*args, **kwargs)
        
        
# class QuoteForm(forms.ModelForm):
#     class Meta:
#         model = Quote
#         fields = ['fast', 'normal', 'economy']