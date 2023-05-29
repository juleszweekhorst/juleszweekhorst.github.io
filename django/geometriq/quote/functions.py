# import os
# import sys
# import FreeCAD
# import Part
# import Mesh

# # this is the directory of the python script
# dir_path = os.path.dirname(os.path.realpath(__file__))
# # now we have the directory of the folder to store the STL
# directoryToStoreSTL = dir_path + "/dataSTL/"

# STEPinput = (sys.argv[1]) #get the path+filename of the STEP file
# shape = Part.Shape()
# shape.read(STEPinput)

# #STRING HANDLING
# #get only the filename of the STEP file, in order to give the same name to the STL file. From arg input, we want to remove the path and the '.STEP' part
# #find last occurence of the character '/'
# lo1 = STEPinput.rindex('/')
# #find last occurence of the character '.'
# lo2 = STEPinput.rindex('.')
# STEP_Filename = STEPinput[lo1+1:lo2]
# STL_FilenameAndPath = directoryToStoreSTL + STEP_Filename + ".stl" #directory and name of the STL file to be generated

# #conversion and save STL file
# doc = App.newDocument('Doc')
# pf = doc.addObject("Part::Feature","MyShape")
# pf.Shape = shape
# Mesh.export([pf], STL_FilenameAndPath)