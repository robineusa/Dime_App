
{

function RemoveEmptyFieldsOfJsonArray(jsonArray)
{
    var arrayAttributesJsonObject = Object.keys(jsonArray[0]);
    for (var i = 0; i < arrayAttributesJsonObject.length ; i++)
    {
        if (IsTodosCamposVaciosEnColumna(arrayAttributesJsonObject[i], jsonArray))
        {
            RemoverColumnaDeArrayJson(arrayAttributesJsonObject[i], jsonArray);
        }
    }
}

function IsTodosCamposVaciosEnColumna(attributeColumn, jsonArray)
{
    for (var j = 0; j < jsonArray.length; j++)
    {

        if (jsonArray[j][attributeColumn] != null && jsonArray[j][attributeColumn] != 0)
        {
            return false;
        }
    }
    return true;
}

function RemoverColumnaDeArrayJson(attributeColumn, jsonArray)
{
    var keyByIndex = Object.keys(jsonArray[0]);
    for (var k = 0; k < jsonArray.length; k++) {
        delete jsonArray[k][attributeColumn];
    }
}

}

