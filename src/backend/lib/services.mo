import List "mo:core/List";
import ServicesTypes "../types/services";

module {
  public type Service = ServicesTypes.Service;
  public type ServiceCategory = ServicesTypes.ServiceCategory;

  public func getServices(services : List.List<Service>) : [Service] {
    services.toArray()
  };

  public func getServicesByCategory(services : List.List<Service>, category : ServiceCategory) : [Service] {
    services.filter(func(s) { s.category == category }).toArray()
  };

  public func initDefaultServices(services : List.List<Service>) : () {
    if (not services.isEmpty()) { return };
    let defaults : [Service] = [
      {
        id = 0;
        name = "ELS Pack";
        description = "Complete ELS pack with configurations for all major department types.";
        category = #ELS;
        priceUSD = 20.0;
        priceRobux = 100;
        isAvailable = true;
        inclusions = ["Sheriff configuration", "Police configuration", "State Patrol / Highway Patrol configuration", "Fire Department configuration"];
      },
      {
        id = 1;
        name = "Single ELS Pattern";
        description = "A single custom ELS lighting pattern.";
        category = #ELS;
        priceUSD = 5.0;
        priceRobux = 50;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 2;
        name = "Livery Pack (6 Vehicles)";
        description = "Custom livery pack for six vehicles of your choice. Unused slots may be donated to other members with proper credit.";
        category = #Livery;
        priceUSD = 30.0;
        priceRobux = 800;
        isAvailable = true;
        inclusions = ["6 vehicles of client's choice", "Unused slots may be donated with proper credit"];
      },
      {
        id = 3;
        name = "Additional Vehicle";
        description = "Add an extra vehicle livery to an existing pack.";
        category = #Livery;
        priceUSD = 10.0;
        priceRobux = 100;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 4;
        name = "Discord Embed";
        description = "Custom-designed Discord embed for announcements or server branding.";
        category = #Graphics;
        priceUSD = 10.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 5;
        name = "Logo";
        description = "Professional logo design for your community or brand.";
        category = #Graphics;
        priceUSD = 5.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 6;
        name = "Profile Picture (PFP)";
        description = "Custom profile picture artwork.";
        category = #Graphics;
        priceUSD = 7.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 7;
        name = "Banner";
        description = "Custom banner design for Discord servers or websites.";
        category = #Graphics;
        priceUSD = 20.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 8;
        name = "Discord Server Configuration";
        description = "Full Discord server setup and configuration.";
        category = #CommunitySetup;
        priceUSD = 30.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 9;
        name = "Website Creation (Google Sites)";
        description = "Professional website created on Google Sites.";
        category = #CommunitySetup;
        priceUSD = 50.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 10;
        name = "Prebuilt Bot (SCNX or Bot Ghost)";
        description = "Pre-configured bot setup using SCNX or Bot Ghost platforms.";
        category = #BotDevelopment;
        priceUSD = 15.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = [];
      },
      {
        id = 11;
        name = "Custom Discord Bot";
        description = "Fully coded and personalized Discord bot. Final pricing varies based on requested features and complexity.";
        category = #BotDevelopment;
        priceUSD = 40.0;
        priceRobux = 0;
        isAvailable = true;
        inclusions = ["Fully coded and personalized", "Pricing varies by complexity"];
      },
    ];
    for (s in defaults.values()) {
      services.add(s);
    };
  };
};
