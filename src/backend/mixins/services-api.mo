import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import ServicesTypes "../types/services";
import ServicesLib "../lib/services";

mixin (
  accessControlState : AccessControl.AccessControlState,
  services : List.List<ServicesTypes.Service>,
) {
  public query func getServices() : async [ServicesTypes.Service] {
    ServicesLib.getServices(services)
  };

  public query func getServicesByCategory(category : ServicesTypes.ServiceCategory) : async [ServicesTypes.Service] {
    ServicesLib.getServicesByCategory(services, category)
  };
};
