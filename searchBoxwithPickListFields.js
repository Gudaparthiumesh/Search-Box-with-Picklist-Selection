({
    doInit : function(cmp, event, helper) {
        var action = cmp.get("c.getAccountFields");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();
            console.log("==>"+JSON.stringify(result));
            console.log(state);
            if (state === "SUCCESS") 
            {
                var FieldsReq = [];
                for(var n in result)
                {
                    if(n == 'FieldName')
                    {
                        for(var ts in result[n])
                        {
                            if(result[n][ts] == 'name' || result[n][ts] == 'industry' || result[n][ts] == 'phone')
                            {
                                FieldsReq.push(result[n][ts]); 
                            }
                        }
                        console.log("==>requiredFields: "+FieldsReq);
                        cmp.set("v.requiredFields",FieldsReq);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    searchResults: function(cmp, event, helper) {
        var searchedText = cmp.find("searchText").get("v.value");
        //alert(searchedText);
        var pickedValue = cmp.find("selectedPicklistValue").get("v.value");
        //alert(pickedValue);
        console.log('==>searchedText: '+searchedText);
        console.log('==>pickedValue: '+pickedValue);
        var action=cmp.get("c.getResults");
        action.setParams({
            'srctext':searchedText,
            'pickVal': pickedValue
        }); 
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=='SUCCESS') {
                console.log("==>"+JSON.stringify(response));
                cmp.set("v.searchedResults",response.getReturnValue()); 
                cmp.set("v.searchedResultsLength",response.getReturnValue().length);
            }
        });
        $A.enqueueAction(action);
    },
})
