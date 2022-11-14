({
  loadContacts: function (component) {
    // Load all contact data

    let action1 = component.get("c.getContacts");

    action1.setCallback(this, function (response) {
      console.log("In first callback function");
      console.log("response", response);
      let state = response.getState();
      if (state === "SUCCESS") {
        let records = response.getReturnValue();

        records.forEach(function (record) {
          record.linkName = "/" + record.Id;
        });
        component.set("v.data", records);
      }
    });
    $A.enqueueAction(action1);
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
          contact.linkName = "/" + contact.Id;
        });
      }
      component.set("v.data", contacts);
    });

    $A.enqueueAction(action);
  },
});
