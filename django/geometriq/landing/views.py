from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test

# def anonymous_required(function=None, redirect_url=None):
#     if not redirect_url:
#         redirect_url =''

#     actual_decorator = user_passes_test(
#         lambda u: u.is_anonymous,
#         login_url=redirect_url
#     )
#     if function:
#         return actual_decorator(function)
#     return actual_decorator

# @anonymous_required
def home(request):
    template = 'home.html'

    return render(request, template,{})
# @anonymous_required
def how(request):
    template = 'how.html'

    return render(request, template,{})

# @anonymous_required
def why(request):
    template = 'why.html'
    context = {}

    return render(request, template, context)

# @anonymous_required
def contact(request):
    template = 'contact.html'

    return render(request, template,{})