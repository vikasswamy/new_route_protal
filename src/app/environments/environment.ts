export const environment = {
    production: false,
    local: true,
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
  
    clientId : '9746c5a8-6086-412d-86ff-8159613a1cfb',
    tenantId : '8e4a72ef-928b-45b6-a137-7ed7bb318678',
    accessScope: 'api://8c8ba30b-73f0-462c-b7de-0e32bcc24ce7/cus_portal_user_access',
  
    BaseURL: 'https://connectapi-dev.abm.com/emp-api/',
    AssetsEndpoint: 'https://connectapi-dev.abm.com/web-assets/',
    apiBaseUrl: "https://connectapi-dev.abm.com/srt/emp/api/v1/",
    mapbox_accessToken:"pk.eyJ1IjoidmlrYXMtc3dhbXkiLCJhIjoiY2t3eWticmc1MG5yZjM0cXR3czBheDMyeCJ9.ROb_2S1Qd_47JhnT_x6xMQ",
    mapbox_styleURL:"mapbox://styles/vikas-swamy/cl8l7gdnp000h15mxq4a6d1m0",

    authorityDomain: '',
    authority : '',
  
    insightsSecret: '91b3a68d-7933-4b6d-9933-6d0b3c119d7b',
    telemetryTag: 'CFT_EMP_DEV',
  
    smartRoutingBaseUrl: 'https://connectapi-dev.abm.com/srt/emp/',
    smartRoutingTenantId: 'f7aca08c0cb148eaa13c3c23a695d33c',
  
    abmConnectHomePage: "https://connectemp-dev.abm.com/abm-connect/",
    tustin_centerPoint: [-117.80461182318, 33.72120860404],
  tustin_First_floor_geojson: "https://storagesmartroute27.blob.core.windows.net/geojson/tustin/ABM_Floors_1_Polygon_Staging.geojson",
  tustin_Second_floor_geojson: "https://storagesmartroute27.blob.core.windows.net/geojson/tustin/ABM_Floors_2_Polygon_Staging.geojson",
  tusti_allFloors_floor_geojson: "https://storagesmartroute27.blob.core.windows.net/3d-geojson/Tustin/tustin_Polygon.geojson",
  tustin_firstFloor_centroid: "https://storagesmartroute27.blob.core.windows.net/geojson/tustin/ABM_Centroid_Floor1_Staging.geojson",
  tustin_secondFloor_centroid: "https://storagesmartroute27.blob.core.windows.net/geojson/tustin/ABM_Centroid_Floor2_Staging.geojson",

  
    acc: 'emp'
  };