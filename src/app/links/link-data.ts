import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Link } from './link';

export class LinkData implements InMemoryDbService {

  createDb() {
    const links: Link[] = [
      {
        'id': 1,
        'name': 'agame1.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 1, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       {
        'id': 2,
        'name': 'agame2.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 2, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       {
        'id': 3,
        'name': 'agame2.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 3, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       {
        'id': 4,
        'name': 'agame2.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 4, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       {
        'id': 5,
        'name': 'agame2.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 5, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       {
        'id': 6,
        'name': 'agame2.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 6, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       {
        'id': 7,
        'name': 'agame2.com',
        'value': 'http://www.agame.com/game/magic-links',
        'createdDateTime': 'May 7, 2019',
        'imageUrl': 'https://files.cdn.spilcloud.com/gms_s/1514898168_1509719279_200.png'
       },
       
    ];
    return { links };
  }
}
