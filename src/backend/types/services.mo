module {
  public type ServiceCategory = {
    #ELS;
    #Livery;
    #Graphics;
    #CommunitySetup;
    #BotDevelopment;
  };

  public type Service = {
    id : Nat;
    name : Text;
    description : Text;
    category : ServiceCategory;
    priceUSD : Float;
    priceRobux : Nat;
    isAvailable : Bool;
    inclusions : [Text];
  };
};
