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
            
    if request.method == 'POST' and request.FILES:
         for file_key, uploaded_file in request.FILES.items():

                    
            model = ThreeDModel.objects.create(
                name = uploaded_file,
                model_file = request.FILES['file']
            )
            model.save()
            id= model.UniqueId
            print(id)

         return redirect('model_list', id =model.UniqueId)


            
    else:

        return render(request, 'quote.html')


def model_list(request, id ):

    # models = ThreeDModel.objects.get(model_file=model)
    threeDModel = ThreeDModel.objects.get(UniqueId=id )
    specificationForm = ThreeDModelSpecificationForm(request.POST)
    priceForm = PriceForm(request.POST)
    # quoteForm = QuoteForm(request.POST)
    field_name = 'fast'

    ThreeDModel.fast = 10
    ThreeDModel.normal = 8 
    ThreeDModel.economy = 5 

    # ThreeDModel.save()
    print('save')

    # obj = ThreeDModel.objects.get(pk=1)
    # print(obj)
    # my_object = Quote.objects.get(id=1)  # Assuming you want to retrieve an object with ID 1
    # value = obj.fast(value)  
    models= 3
    
    context={}
    context['model'] = threeDModel
    context['form'] = specificationForm
    context['price'] = priceForm


    return render(request, 'model_list.html', context)

def threejs_view(request):
    return render(request, 'threejs_template.html')