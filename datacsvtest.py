import pandas as pd
df = pd.read_csv (r'C:\Users\marcu\Downloads\test_data.csv')
df.dtypes
df['datasource;dayofservice;tripid;progrnumber;stoppointid;plannedtime_arr;plannedtime_dep;actualtime_arr;actualtime_dep;vehicleid;passengers;passengersin;passengersout;distance;suppressed;justificationid;lastupdate;note'].astype('string')
df= df['datasource;dayofservice;tripid;progrnumber;stoppointid;plannedtime_arr;plannedtime_dep;actualtime_arr;actualtime_dep;vehicleid;passengers;passengersin;passengersout;distance;suppressed;justificationid;lastupdate;note'].str.split(';', expand=True)
#switch data to string type then separate into columns using split
df.columns = ['datasource', 'dayofservice','tripid','progrnumber','stoppointid','plannedtime_ar','plannedtime_dep','actualtime_arr','actualtime_dep','vehicleid','passengers','passengersin','passengersout','distance','suppressed','justificationid','lastupdate','note']
#rename columns as doesnt automatically name
df.to_csv('datatestfile.csv')
#send to csv file format to save. 
