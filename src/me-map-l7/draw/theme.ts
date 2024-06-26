export default [
  {
    'id': 'gl-draw-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillColor'],
        '#3bb2d0'
      ],
      'fill-outline-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillOutlineColor'],
        '#3bb2d0'
      ],
      'fill-opacity': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillOpacity'],
        0.1
      ]
    }
  },
  {
    'id': 'gl-draw-polygon-fill-active',
    'type': 'fill',
    'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    'paint': {
      'fill-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillColor'],
        'green'
      ],
      'fill-outline-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillOutlineColor'],
        'green'
      ],
      'fill-opacity': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillOpacity'],
        0.1
      ]
    }
  },
  {
    'id': 'gl-draw-polygon-midpoint',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'midpoint']],
    'paint': {
      'circle-radius': 3,
      'circle-color': '#fbb03b'
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillOutlineColor'],
        '#3bb2d0'
      ],
      'line-width': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineWidth'],
        2
      ]
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-active',
    'type': 'line',
    'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_fillOutlineColor'],
        '#fbb03b'
      ],
      'line-dasharray': [0.2, 2],
      'line-width': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineWidth'],
        2
      ]
    }
  },
  {
    'id': 'gl-draw-line-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'LineString'],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineColor'],
        '#fbb03b'
      ],
      'line-width': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineWidth'],
        2
      ],
      'line-opacity' : [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineOpacity'],
        1
      ]
    }
  },
  {
    'id': 'gl-draw-line-active',
    'type': 'line',
    'filter': ['all',
      ['==', '$type', 'LineString'],
      ['==', 'active', 'true']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineColor'],
        '#fbb03b'
      ],
      'line-dasharray': [0.2, 2],
      'line-width': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineWidth'],
        2
      ],
      'line-opacity' : [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineOpacity'],
        1
      ]
    }
  },
  {
    'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#fff'
    }
  },
  {
    'id': 'gl-draw-polygon-and-line-vertex-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 3,
      'circle-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleColor'],
        '#fbb03b'
      ]
    }
  },
  {
    'id': 'gl-draw-point-point-stroke-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 5,
      'circle-opacity': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleOpacity'],
        1
      ],
      'circle-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleColor'],
        '#fff'
      ]
    }
  },
  {
    'id': 'gl-draw-point-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleRadius'],
        3
      ],
      'circle-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleColor'],
        '#3bb2d0'
      ],
      'circle-opacity' : [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleOpacity'],
        0.2
      ]
    }
  },
  {
    'id': 'gl-draw-point-stroke-active',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['==', 'active', 'true'],
      ['!=', 'meta', 'midpoint']
    ],
    'paint': {
      'circle-radius': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['+' , ['get' , 'user_circleRadius'] , 3],
        5
      ],
      'circle-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleColor'],
        '#fff'
      ],
      'circle-opacity' : [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleOpacity'],
        0.2
      ]
    }
  },
  {
    'id': 'gl-draw-point-active',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['==', 'active', 'true']],
    'paint': {
      'circle-radius': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleRadius'],
        5
      ],
      'circle-color': [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleColor'],
        '#3bb2d0'
      ],
      'circle-opacity' : [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_circleOpacity'],
        0.2
      ]
    }
  },
  {
    'id': 'gl-draw-polygon-fill-static',
    'type': 'fill',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
    'paint': {
      'fill-color': '#404040',
      'fill-outline-color': '#404040',
      'fill-opacity': 0.1
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-static',
    'type': 'line',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#404040',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-line-static',
    'type': 'line',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#404040',
      'line-width': 2,
      'line-opacity' : [
        'case',
        ['==' , ['get' , 'user_custom'] , true],
        ['get' , 'user_lineOpacity'],
        1
      ]
    }
  },
  {
    'id': 'gl-draw-point-static',
    'type': 'circle',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#404040'
    }
  }
];