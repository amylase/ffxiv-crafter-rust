
export const statusConditions = [
    "NORMAL",
    "GOOD",
    "EXCELLENT",
    "POOR",
    "CENTRED",
    "PLIANT",
    "STURDY",
    "MALLEABLE",
    "PRIMED",
];
export type StatusCondition = typeof statusConditions[number];

export const craftResults = [
    "ONGOING",
    "FAILED",
    "SUCCESS",
]
export type CraftResult = typeof craftResults[number];

export const craftActions = [
    "BasicSynthesis",
    "BasicTouch",
    "MastersMend",
    "InnerQuiet",
    "DelicateSynthesis",
    "CarefulSynthesis",
    "Groundwork",
    "Observe",
    "ByregotBlessing",
    "PreparatoryTouch",
    "RapidSynthesis",
    "IntensiveSynthesis",
    "HastyTouch",
    "PreciseTouch",
    "PatientTouch",
    "TrickOfTheTrade",
    "Innovation",
    "Veneration",
    "MuscleMemory",
    "FocusedSynthesis",
    "StandardTouch",
    "FocusedTouch",
    "Reflect",
    "WasteNot",
    "WasteNotII",
    "PrudentTouch",
    "GreatStrides",
    "FinalAppraisal",
    "Manipulation",
]
export type CraftAction = typeof craftActions[number];

export interface ItemParameter {
    internal_level: number,
    max_durability: number,
    max_progress: number,
    max_quality: number,
    standard_craftsmanship: number,
    standard_control: number,
    is_expert_recipe: boolean,
}

export interface PlayerParameter {
    raw_level: number,
    craftsmanship: number,
    control: number,
    max_cp: number,
}

export interface CraftParameter {
    player: PlayerParameter,
    item: ItemParameter,
}

export interface CraftConfiguration {
    params: CraftParameter
    initialQuality: number
}

export interface CraftState {
    durability: number,
    progress: number,
    quality: number,
    cp: number,
    condition: StatusCondition,

    inner_quiet: number,
    innovation: number,
    veneration: number,
    muscle_memory: number,
    waste_not: number,
    great_strides: number,
    final_appraisal: number,
    manipulation: number,
    turn: number,

    prev_action?: CraftAction,
    result: CraftResult,
}

export interface ProbabilisticState {
    state: CraftState,
    probability: number,
}

export function initial_state(config: CraftConfiguration): CraftState {
    const { params, initialQuality } = config;
    return {
        durability: params.item.max_durability,
        progress: 0,
        quality: initialQuality,
        cp: params.player.max_cp,
        condition: "NORMAL",

        inner_quiet: 0,
        innovation: 0,
        veneration: 0,
        muscle_memory: 0,
        waste_not: 0,
        great_strides: 0,
        final_appraisal: 0,
        manipulation: 0,
        turn: 1,

        result: "ONGOING",
    };
}

const suggestedCraftsmanships = {
    1: 22,
    2: 22,
    3: 22,
    4: 22,
    5: 50,
    6: 50,
    7: 50,
    8: 59,
    9: 59,
    10: 59,
    11: 67,
    12: 67,
    13: 67,
    14: 67,
    15: 67,
    16: 78,
    17: 78,
    18: 78,
    19: 82,
    20: 94,
    21: 94,
    22: 94,
    23: 99,
    24: 99,
    25: 99,
    26: 99,
    27: 99,
    28: 106,
    29: 106,
    30: 106,
    31: 121,
    32: 121,
    33: 121,
    34: 129,
    35: 129,
    36: 129,
    37: 129,
    38: 129,
    39: 136,
    40: 136,
    41: 136,
    42: 150,
    43: 150,
    44: 150,
    45: 150,
    46: 150,
    47: 161,
    48: 161,
    49: 161,
    50: 176,
    51: 281,
    52: 291,
    53: 302,
    54: 314,
    55: 325,
    56: 325,
    57: 325,
    58: 325,
    59: 325,
    60: 325,
    61: 325,
    62: 325,
    63: 325,
    64: 325,
    65: 325,
    66: 325,
    67: 325,
    68: 325,
    69: 325,
    70: 325,
    71: 329,
    72: 332,
    73: 335,
    74: 339,
    75: 342,
    76: 345,
    77: 349,
    78: 352,
    79: 355,
    80: 358,
    81: 362,
    82: 365,
    83: 368,
    84: 372,
    85: 375,
    86: 378,
    87: 382,
    88: 385,
    89: 388,
    90: 391,
    91: 394,
    92: 397,
    93: 400,
    94: 403,
    95: 406,
    96: 409,
    97: 412,
    98: 415,
    99: 418,
    100: 421,
    101: 424,
    102: 427,
    103: 430,
    104: 433,
    105: 436,
    106: 439,
    107: 442,
    108: 445,
    109: 448,
    110: 451,
    111: 455,
    112: 458,
    113: 462,
    114: 465,
    115: 468,
    116: 472,
    117: 475,
    118: 479,
    119: 482,
    120: 485,
    121: 489,
    122: 492,
    123: 495,
    124: 499,
    125: 502,
    126: 506,
    127: 509,
    128: 512,
    129: 516,
    130: 519,
    131: 522,
    132: 526,
    133: 529,
    134: 533,
    135: 536,
    136: 539,
    137: 543,
    138: 546,
    139: 550,
    140: 553,
    141: 556,
    142: 560,
    143: 563,
    144: 566,
    145: 570,
    146: 573,
    147: 577,
    148: 580,
    149: 583,
    150: 587,
    151: 590,
    152: 593,
    153: 597,
    154: 600,
    155: 604,
    156: 607,
    157: 610,
    158: 614,
    159: 617,
    160: 620,
    161: 625,
    162: 630,
    163: 635,
    164: 640,
    165: 645,
    166: 650,
    167: 655,
    168: 660,
    169: 665,
    170: 669,
    171: 674,
    172: 679,
    173: 684,
    174: 689,
    175: 694,
    176: 699,
    177: 704,
    178: 709,
    179: 714,
    180: 718,
    181: 723,
    182: 727,
    183: 732,
    184: 736,
    185: 740,
    186: 745,
    187: 749,
    188: 754,
    189: 758,
    190: 762,
    191: 767,
    192: 771,
    193: 776,
    194: 780,
    195: 784,
    196: 789,
    197: 793,
    198: 798,
    199: 802,
    200: 806,
    201: 811,
    202: 815,
    203: 820,
    204: 824,
    205: 828,
    206: 833,
    207: 837,
    208: 842,
    209: 846,
    210: 850,
    211: 852,
    212: 854,
    213: 856,
    214: 858,
    215: 860,
    216: 862,
    217: 864,
    218: 866,
    219: 868,
    220: 870,
    221: 875,
    222: 879,
    223: 883,
    224: 887,
    225: 891,
    226: 895,
    227: 900,
    228: 904,
    229: 908,
    230: 912,
    231: 916,
    232: 920,
    233: 925,
    234: 929,
    235: 933,
    236: 937,
    237: 941,
    238: 945,
    239: 950,
    240: 954,
    241: 958,
    242: 962,
    243: 966,
    244: 970,
    245: 975,
    246: 979,
    247: 983,
    248: 987,
    249: 991,
    250: 995,
    251: 998,
    252: 1000,
    253: 1002,
    254: 1004,
    255: 1006,
    256: 1008,
    257: 1010,
    258: 1012,
    259: 1014,
    260: 1016,
    261: 1019,
    262: 1021,
    263: 1023,
    264: 1025,
    265: 1027,
    266: 1029,
    267: 1031,
    268: 1033,
    269: 1035,
    270: 1037,
    271: 1040,
    272: 1042,
    273: 1044,
    274: 1046,
    275: 1048,
    276: 1050,
    277: 1052,
    278: 1054,
    279: 1056,
    280: 1058,
    281: 1061,
    282: 1063,
    283: 1065,
    284: 1067,
    285: 1069,
    286: 1071,
    287: 1073,
    288: 1075,
    289: 1077,
    290: 1079,
    291: 1082,
    292: 1084,
    293: 1086,
    294: 1088,
    295: 1090,
    296: 1092,
    297: 1094,
    298: 1096,
    299: 1098,
    300: 1100,
    301: 1111,
    302: 1122,
    303: 1133,
    304: 1144,
    305: 1155,
    306: 1166,
    307: 1177,
    308: 1188,
    309: 1199,
    310: 1210,
    311: 1221,
    312: 1232,
    313: 1243,
    314: 1254,
    315: 1265,
    316: 1276,
    317: 1287,
    318: 1298,
    319: 1309,
    320: 1320,
    321: 1326,
    322: 1332,
    323: 1338,
    324: 1344,
    325: 1350,
    326: 1356,
    327: 1362,
    328: 1368,
    329: 1374,
    330: 1380,
    331: 1386,
    332: 1392,
    333: 1398,
    334: 1404,
    335: 1410,
    336: 1416,
    337: 1422,
    338: 1428,
    339: 1434,
    340: 1440,
    341: 1446,
    342: 1452,
    343: 1458,
    344: 1464,
    345: 1470,
    346: 1476,
    347: 1482,
    348: 1488,
    349: 1494,
    350: 1500,
    351: 1505,
    352: 1510,
    353: 1515,
    354: 1520,
    355: 1525,
    356: 1530,
    357: 1535,
    358: 1540,
    359: 1545,
    360: 1550,
    361: 1555,
    362: 1560,
    363: 1565,
    364: 1570,
    365: 1575,
    366: 1580,
    367: 1585,
    368: 1590,
    369: 1595,
    370: 1600,
    371: 1605,
    372: 1610,
    373: 1615,
    374: 1620,
    375: 1625,
    376: 1630,
    377: 1635,
    378: 1640,
    379: 1645,
    380: 1650,
    381: 1320,
    382: 1320,
    383: 1320,
    384: 1320,
    385: 1320,
    386: 1320,
    387: 1320,
    388: 1320,
    389: 1320,
    390: 1320,
    391: 1334,
    392: 1347,
    393: 1361,
    394: 1375,
    395: 1388,
    396: 1402,
    397: 1416,
    398: 1429,
    399: 1443,
    400: 1457,
    401: 1470,
    402: 1484,
    403: 1498,
    404: 1511,
    405: 1525,
    406: 1539,
    407: 1552,
    408: 1566,
    409: 1580,
    410: 1593,
    411: 1607,
    412: 1621,
    413: 1634,
    414: 1648,
    415: 1662,
    416: 1675,
    417: 1689,
    418: 1702,
    419: 1716,
    420: 1730,
    421: 1743,
    422: 1757,
    423: 1771,
    424: 1784,
    425: 1798,
    426: 1812,
    427: 1825,
    428: 1839,
    429: 1853,
    430: 1866,
    431: 1880,
    432: 1894,
    433: 1907,
    434: 1921,
    435: 1935,
    436: 1948,
    437: 1962,
    438: 1976,
    439: 1989,
    440: 2000,
    441: 2017,
    442: 2030,
    443: 2044,
    444: 2058,
    445: 2071,
    446: 2085,
    447: 2099,
    448: 2112,
    449: 2126,
    450: 2140,
    480: 2160,
    490: 2180
}

const suggestedControls = {
    1: 11,
    2: 11,
    3: 11,
    4: 11,
    5: 25,
    6: 25,
    7: 25,
    8: 29,
    9: 29,
    10: 29,
    11: 33,
    12: 33,
    13: 33,
    14: 33,
    15: 33,
    16: 39,
    17: 39,
    18: 39,
    19: 41,
    20: 47,
    21: 47,
    22: 47,
    23: 49,
    24: 49,
    25: 49,
    26: 49,
    27: 49,
    28: 53,
    29: 53,
    30: 53,
    31: 60,
    32: 60,
    33: 60,
    34: 64,
    35: 64,
    36: 64,
    37: 64,
    38: 64,
    39: 68,
    40: 68,
    41: 68,
    42: 75,
    43: 75,
    44: 75,
    45: 75,
    46: 75,
    47: 80,
    48: 80,
    49: 80,
    50: 88,
    51: 281,
    52: 291,
    53: 302,
    54: 314,
    55: 325,
    56: 325,
    57: 325,
    58: 325,
    59: 325,
    60: 325,
    61: 325,
    62: 325,
    63: 325,
    64: 325,
    65: 325,
    66: 325,
    67: 325,
    68: 325,
    69: 325,
    70: 325,
    71: 328,
    72: 330,
    73: 333,
    74: 335,
    75: 338,
    76: 340,
    77: 343,
    78: 345,
    79: 348,
    80: 350,
    81: 352,
    82: 355,
    83: 357,
    84: 360,
    85: 362,
    86: 365,
    87: 367,
    88: 370,
    89: 372,
    90: 374,
    91: 376,
    92: 378,
    93: 379,
    94: 381,
    95: 383,
    96: 384,
    97: 386,
    98: 388,
    99: 389,
    100: 391,
    101: 393,
    102: 394,
    103: 396,
    104: 398,
    105: 399,
    106: 401,
    107: 403,
    108: 404,
    109: 406,
    110: 407,
    111: 411,
    112: 415,
    113: 418,
    114: 422,
    115: 426,
    116: 429,
    117: 433,
    118: 437,
    119: 440,
    120: 444,
    121: 448,
    122: 451,
    123: 455,
    124: 458,
    125: 462,
    126: 466,
    127: 469,
    128: 473,
    129: 477,
    130: 480,
    131: 484,
    132: 488,
    133: 491,
    134: 495,
    135: 498,
    136: 502,
    137: 506,
    138: 509,
    139: 513,
    140: 517,
    141: 520,
    142: 524,
    143: 528,
    144: 531,
    145: 535,
    146: 539,
    147: 542,
    148: 546,
    149: 549,
    150: 553,
    151: 557,
    152: 560,
    153: 564,
    154: 568,
    155: 571,
    156: 575,
    157: 579,
    158: 582,
    159: 586,
    160: 589,
    161: 595,
    162: 600,
    163: 605,
    164: 611,
    165: 616,
    166: 621,
    167: 627,
    168: 632,
    169: 637,
    170: 642,
    171: 648,
    172: 653,
    173: 658,
    174: 664,
    175: 669,
    176: 674,
    177: 680,
    178: 685,
    179: 690,
    180: 695,
    181: 700,
    182: 704,
    183: 708,
    184: 712,
    185: 716,
    186: 720,
    187: 725,
    188: 729,
    189: 733,
    190: 737,
    191: 741,
    192: 745,
    193: 750,
    194: 754,
    195: 758,
    196: 762,
    197: 766,
    198: 770,
    199: 775,
    200: 779,
    201: 783,
    202: 787,
    203: 791,
    204: 795,
    205: 800,
    206: 804,
    207: 808,
    208: 812,
    209: 816,
    210: 820,
    211: 822,
    212: 823,
    213: 825,
    214: 826,
    215: 828,
    216: 829,
    217: 831,
    218: 832,
    219: 834,
    220: 835,
    221: 839,
    222: 843,
    223: 847,
    224: 851,
    225: 855,
    226: 859,
    227: 863,
    228: 867,
    229: 871,
    230: 875,
    231: 879,
    232: 883,
    233: 887,
    234: 891,
    235: 895,
    236: 899,
    237: 903,
    238: 907,
    239: 911,
    240: 915,
    241: 919,
    242: 923,
    243: 927,
    244: 931,
    245: 935,
    246: 939,
    247: 943,
    248: 947,
    249: 951,
    250: 955,
    251: 958,
    252: 960,
    253: 963,
    254: 965,
    255: 968,
    256: 970,
    257: 973,
    258: 975,
    259: 978,
    260: 980,
    261: 983,
    262: 985,
    263: 988,
    264: 990,
    265: 993,
    266: 995,
    267: 998,
    268: 1000,
    269: 1003,
    270: 1005,
    271: 1008,
    272: 1010,
    273: 1013,
    274: 1015,
    275: 1018,
    276: 1020,
    277: 1023,
    278: 1025,
    279: 1028,
    280: 1030,
    281: 1033,
    282: 1035,
    283: 1038,
    284: 1040,
    285: 1043,
    286: 1045,
    287: 1048,
    288: 1050,
    289: 1053,
    290: 1055,
    291: 1058,
    292: 1060,
    293: 1063,
    294: 1065,
    295: 1068,
    296: 1070,
    297: 1073,
    298: 1075,
    299: 1078,
    300: 1080,
    301: 1087,
    302: 1094,
    303: 1101,
    304: 1108,
    305: 1115,
    306: 1122,
    307: 1129,
    308: 1136,
    309: 1143,
    310: 1150,
    311: 1157,
    312: 1164,
    313: 1171,
    314: 1178,
    315: 1185,
    316: 1192,
    317: 1199,
    318: 1206,
    319: 1213,
    320: 1220,
    321: 1224,
    322: 1229,
    323: 1233,
    324: 1237,
    325: 1242,
    326: 1246,
    327: 1250,
    328: 1255,
    329: 1259,
    330: 1263,
    331: 1268,
    332: 1272,
    333: 1276,
    334: 1281,
    335: 1285,
    336: 1289,
    337: 1294,
    338: 1298,
    339: 1302,
    340: 1307,
    341: 1311,
    342: 1315,
    343: 1320,
    344: 1324,
    345: 1328,
    346: 1333,
    347: 1337,
    348: 1341,
    349: 1346,
    350: 1350,
    351: 1358,
    352: 1366,
    353: 1374,
    354: 1383,
    355: 1391,
    356: 1399,
    357: 1408,
    358: 1416,
    359: 1424,
    360: 1433,
    361: 1441,
    362: 1449,
    363: 1458,
    364: 1466,
    365: 1474,
    366: 1483,
    367: 1491,
    368: 1499,
    369: 1508,
    370: 1516,
    371: 1524,
    372: 1533,
    373: 1541,
    374: 1549,
    375: 1558,
    376: 1566,
    377: 1574,
    378: 1583,
    379: 1592,
    380: 1600,
    381: 1220,
    382: 1220,
    383: 1220,
    384: 1220,
    385: 1220,
    386: 1220,
    387: 1220,
    388: 1220,
    389: 1220,
    390: 1220,
    391: 1233,
    392: 1246,
    393: 1258,
    394: 1271,
    395: 1284,
    396: 1297,
    397: 1310,
    398: 1323,
    399: 1335,
    400: 1348,
    401: 1361,
    402: 1374,
    403: 1387,
    404: 1400,
    405: 1412,
    406: 1425,
    407: 1438,
    408: 1451,
    409: 1464,
    410: 1477,
    411: 1489,
    412: 1502,
    413: 1515,
    414: 1528,
    415: 1541,
    416: 1554,
    417: 1566,
    418: 1579,
    419: 1592,
    420: 1605,
    421: 1618,
    422: 1631,
    423: 1643,
    424: 1656,
    425: 1669,
    426: 1682,
    427: 1695,
    428: 1708,
    429: 1720,
    430: 1733,
    431: 1746,
    432: 1759,
    433: 1772,
    434: 1785,
    435: 1797,
    436: 1810,
    437: 1823,
    438: 1836,
    439: 1849,
    440: 1860,
    441: 1874,
    442: 1887,
    443: 1900,
    444: 1913,
    445: 1926,
    446: 1938,
    447: 1951,
    448: 1964,
    449: 1977,
    450: 1990,
    480: 2000,
    490: 2010
}