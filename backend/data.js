const maintenanceDetails = {
  '6021cc5e3e7d69081762095f6cfac0eb': {
    title: '5,000 Miles or 6 Months',
    details: [
      'Check installation of driver’s floor mat',
      'Inspect and adjust all fluid levels',
      'Inspect wiper blades',
      'Rotate tires',
      'Visually inspect brake linings/drums and brake pads'
    ]
  },
  d88810cef5584d1b9c7879b3e4b4c5a2: {
    title: '10,000 Miles or 12 Months',
    details: [
      'Check installation of driver’s floor mat',
      'Inspect and adjust all fluid levels',
      'Inspect wiper blades',
      'Replace cabin air filter',
      'Replace engine oil and oil filter',
      'Rotate tires',
      'Visually inspect brake linings/drums and brake pads/discs'
    ]
  },
  '5173841c64bdd80d16df6e933d69b2bd': {
    title: '15,000 Miles or 18 Months',
    details: [
      'Check installation of driver’s floor mat',
      'Inspect and adjust all fluid levels',
      'Inspect wiper blades',
      'Rotate tires',
      'Visually inspect brake linings/drums and brake pads/discs',
      'Inspect The Following Ball Joint and Dust Covers, Brake Lines and Hoses, Drive Shaft Boots, Engine Coolant, Exhaust Pipes and Mountings, Radiator and Condenser, Steering Gear, Steering Linkage and Boots'
    ]
  },
  f5e8b351fb731318df2d6b18208dcbcf: {
    title: '20,000 Miles or 24 Months',
    details: [
      'Check installation of driver’s floor mat',
      'Inspect and adjust all fluid levels',
      'Inspect wiper blades',
      'Replace cabin air filter',
      'Replace engine oil and oil filter',
      'Rotate tires',
      'Visually inspect brake linings/drums and brake pads/discs'
    ]
  },
  '96ead03102ed5a9c105ea9dbeb60bc6c': {
    title: '25,000 Miles or 30 Months',
    details: [
      'Check installation of driver’s floor mat',
      'Inspect and adjust all fluid levels',
      'Inspect wiper blades',
      'Rotate tires',
      'Visually inspect brake linings/drums and brake pads/discs'
    ]
  },
  b9195e914e4b315e8f5a6315163269c1: {
    title: '30,000 Miles or 36 Months',
    details: [
      'Check installation of driver’s floor mat',
      'Inspect and adjust all fluid levels',
      'Inspect wiper blades',
      'Replace cabin air filter',
      'Replace engine oil and oil filter',
      'Rotate tires',
      'Replace engine air filter',
      'Inspect The Following: Automatic Transmission for Signs of Leakage, Ball Joints and Dust Covers, Brake Lines and Hoses, Brake Linings/Drums and Brake Pads/Discs,'
    ]
  }
};

const vinToDetails = {
  '2C4HD51R4WH170': {
    id: 'TC2020',
    name: '2020 Toyota Camry',
    requiredMaintenance: [
      '6021cc5e3e7d69081762095f6cfac0eb',
      'd88810cef5584d1b9c7879b3e4b4c5a2',
      '5173841c64bdd80d16df6e933d69b2bd',
      'f5e8b351fb731318df2d6b18208dcbcf',
      '96ead03102ed5a9c105ea9dbeb60bc6c',
      'b9195e914e4b315e8f5a6315163269c1'
    ]
  }
};

exports.vinToDetails = vinToDetails;
exports.maintenanceDetails = maintenanceDetails;

