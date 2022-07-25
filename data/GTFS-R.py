import urllib.request, json

try:
    url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

    hdr = {
        'Cache-Control': 'no-cache',
        'x-api-key': '1f8a62c9ec4b48f3a6117de7bb1083ff',
    }

    req = urllib.request.Request(url, headers=hdr)

    req.get_method = lambda: 'GET'
    response = urllib.request.urlopen(req)
    print(response.getcode())
    # print(response.read())
    s = response.read().decode('utf-8')
    json_obj = json.loads(s)
    print(json_obj)
    
except Exception as e:
    print(e)
