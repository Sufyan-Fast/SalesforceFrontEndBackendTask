({
  loadContacts: function (component) {
    let action = component.get("c.getContacts");

    action.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        let records = response.getReturnValue();

        records.forEach(function (record) {
          record.linkName = "/" + record.Id;
        });
        component.set("v.data", records);
      }
    });
    $A.enqueueAction(action);
  },
});
