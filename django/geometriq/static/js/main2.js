window.addEventListener ('load', () => {
    // tell the engine where to find the libs folder
    OV.SetExternalLibLocation ('../../static/o3dv/libs');
    
    // init all viewers on the page
    OV.Init3DViewerElements ();
});
// http://127.0.0.1:8000/static/o3dv/libs/loaders/occt-import-js-worker.js