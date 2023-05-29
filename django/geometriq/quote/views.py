from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render, redirect
from .forms import *
from .models import ThreeDModel


def quote(request):
    template = 'quote.html'

    return render(request, template,{})

def upload_model(request):
    if request.method == 'POST':
        form = ThreeDModelForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            print(request.POST.get('model_file'))
            return redirect('model_list')
    else:
        form = ThreeDModelForm()
    return render(request, 'quote.html', {'form': form})


def model_list(request):
    models = ThreeDModel.objects.all()
    threeDModel = ThreeDModel()
    specificationForm = ThreeDModelSpecificationForm(request.POST)
    priceForm = PriceForm(request.POST)
    # quoteForm = QuoteForm(request.POST)
    field_name = 'fast'
    ThreeDModel.fast = 10
    ThreeDModel.normal = 8 
    ThreeDModel.economy = 5 

    # ThreeDModel.save()
    print('save')

    obj = ThreeDModel.objects.first()
    # print(obj)
    # my_object = Quote.objects.get(id=1)  # Assuming you want to retrieve an object with ID 1
    # value = obj.fast(value)  
    
    context={}
    context['models'] = models
    context['form'] = specificationForm
    context['price'] = priceForm


    return render(request, 'model_list.html', context)

def threejs_view(request):
    return render(request, 'threejs_template.html')