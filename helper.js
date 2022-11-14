({
  loadContacts: function (component) {
    // Load all contact data
    component.set("v.isLoading", true);
    let action1 = component.get("c.getContacts");

    action1.setCallback(this, function (response) {
      component.set("v.isLoading", false);
      console.log("In first callback function");
      console.log("response", response);
      let state = response.getState();
      if (state === "SUCCESS") {
        let records = response.getReturnValue();

        records.forEach(function (record) {
          //console.log(record)
          record.linkName = "/" + record.Id;
          //var obj= ids.find(record=> record.Id ==ids.LinkedEntityId);
          //record.NotesAndAttachments = obj.ContentDocumentId;
        });
        component.set("v.data", records);
      }

      /*
            // Display toast message to indicate load status
            var toastEvent = $A.get("e.force:showToast");
            if (state === 'SUCCESS'){
                toastEvent.setParams({
                    "title": "Success!",
                    "message": " Your contacts have been loaded successfully."
                });
            }
            else {
                toastEvent.setParams({
                        "title": "Error!",
                        "message": " Something has gone wrong."
                });
            }
            toastEvent.fire();
            */
    });
    $A.enqueueAction(action1);
  },

  showToast: function (title, type, message) {
    let toastEvent = $A.get("e.force:showToast");
    if (toastEvent) {
      toastEvent
        .setParams({ title: title, type: type, message: message })
        .fire();
    } else {
      alert(message);
    }
  },

  searchRecord: function (component) {
    console.log("In search Record function");
    let v = component.get("v.searchText");
    console.log(v);

    let action = component.get("c.getContactDetails");

    action.setParams({
      name: component.get("v.searchText"),
    });

    action.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        var contacts = response.getReturnValue();

        console.log(contacts);

        contacts.forEach(function (contact) {
          //console.log(record)
          contact.linkName = "/" + contact.Id;
        });

        /*
              contacts.forEach(function(contact){
               
                    var obj= v.find(function(obj){
                        return obj  === contact.FirstName || obj === contact.LastName
                    });
                    console.log('objectReturn',obj);
                   
                
				});   
                    
             
             console.log(contact);
             */
      }
      component.set("v.data", contacts);
    });

    $A.enqueueAction(action);
  },

  searchRecordOnFilter: function (component) {
    console.log("In searchRecordOnFilter function");
    let v = component.get("v.ListValue");
    console.log(v);

    let action = component.get("c.getContactDetailsFilter");

    let StringList = JSON.parse(JSON.stringify(component.get("v.ListValue")));
    console.log("String List", StringList);

    action.setParams({
      name: StringList,
    });

    action.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        var contacts = response.getReturnValue();

        console.log("contacts", contacts);

        contacts.forEach(function (contact) {
          //console.log(record)
          contact.linkName = "/" + contact.Id;
        });

        /*
              contacts.forEach(function(contact){
               
                    var obj= v.find(function(obj){
                        return obj  === contact.FirstName || obj === contact.LastName
                    });
                    console.log('objectReturn',obj);
                   
                
				});   
                    
             */
        //console.log(contact);
      }
      component.set("v.data", contacts);
    });

    $A.enqueueAction(action);
  },
});
