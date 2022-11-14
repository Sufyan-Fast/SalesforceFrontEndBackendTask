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
          record.linkName = "/" + record.Id;
        });
        component.set("v.data", records);
      }
    });
    $A.enqueueAction(action1);
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
          contact.linkName = "/" + contact.Id;
        });
      }
      component.set("v.data", contacts);
    });

    $A.enqueueAction(action);
  },
});
