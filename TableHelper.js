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
});
