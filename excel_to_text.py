import pandas as pd
import json

def getJson():
    excel_file_path = 'festarit.xlsx'

    # Read the Excel file
    excel_data = pd.read_excel(excel_file_path, sheet_name=None)

    # Convert each sheet to JSON
    json_data = {}
    for sheet_name, sheet_data in excel_data.items():
        # Convert Timestamp objects to strings
        sheet_data = sheet_data.applymap(lambda x: x.strftime('%d-%m-%Y %H:%M:%S') if isinstance(x, pd.Timestamp) else x)
        
        json_data[sheet_name] = sheet_data.to_dict(orient='records')

    # Convert the JSON data to a JSON string
    json_string = json.dumps(json_data, indent=4, ensure_ascii=False)
    return(json_data)


    # Print or save the JSON string as needed
    #print(json_string)
