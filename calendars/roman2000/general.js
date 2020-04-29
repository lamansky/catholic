'use strict'

const {gregorianEaster} = require('date-easter')
const mapObject = require('map-obj')

const [jan] = [1]
const [sun, mon, , , thu, fri, sat] = [0, 1, 2, 3, 4, 5, 6]

function olo (languages) {
  return mapObject(languages, (l, t) => [l, [
    'Our Lady of ' + t,
    'Our Lady of ' + t,
    'Our Lady of ' + t,
    t,
  ]])
}

module.exports = {
  label: {
    en: 'Roman Rite',
  },
  firstYear: 2001,
  yearStarts: 'firstSundayOfAdvent',
  yearStartsBeforeJan1: true,
  variables: {
    christmas: '1225',
    firstSundayOfAdvent: ({sub}) => sub('christmas', 4, sun),
    epiphany: '0106',
    epiphanyTransferred: false,
    sundayAfterEpiphany: ({add}) => add('epiphany', 1, sun),
    easter: ({year}) => gregorianEaster(year),
    holyThursday: ({sub}) => sub('easter', 1, thu),
    goodFriday: ({sub}) => sub('easter', 1, fri),
    divineMercySunday: ({add}) => add('easter', 1, sun),
    ashWednesday: ({sub}) => sub('easter', 46),
    firstSundayOfLent: ({sub}) => sub('easter', 42),
    palmSunday: ({sub}) => sub('easter', 7),
    ascensionTransferred: false,
    ascension: ({add}) => add('easter', 39),
    sundayAfterAscension: ({add}) => add('easter', 42),
    pentecost: ({add}) => add('easter', 49),
  },
  counters: {
    weekOfAdvent: {
      dateInitial: 'firstSundayOfAdvent',
      valueStepOn: sun,
      until: 'christmas',
    },
    dayOfChristmasAtEndOfYear: {
      dateInitial: 'christmas',
      until: false,
    },
    dayOfChristmasAtBeginningOfYear: {
      dateInitial: '0101',
      valueInitial: 8,
      until: 'sundayAfterEpiphany',
    },
    weekOfOrdinaryTimeAfterEpiphany: {
      dateInitial: ({add}) => add('sundayAfterEpiphany', 1),
      valueStepOn: sun,
      until: 'ashWednesday',
    },
    weekOfLent: {
      dateInitial: 'firstSundayOfLent',
      valueStepOn: sun,
      until: 'palmSunday',
    },
    weekOfEaster: {
      dateInitial: 'easter',
      valueStepOn: sun,
      until: 'pentecost',
    },
    weekOfOrdinaryTimeAfterPentecost: {
      dateInitial: ({sub}) => sub('firstSundayOfAdvent', 1),
      dateStep: -1,
      valueInitial: 34,
      valueStep: -1,
      valueStepOn: sat,
      until: 'pentecost',
    },
  },
  saintClasses: {
    Ap: {
      label: {
        en: 'Apostle',
      },
      compatibleWith: 'Ev',
      defaultColor: 'red',
      gender: 'm',
    },
    Ev: {
      label: {
        en: 'Evangelist',
      },
      compatibleWith: '',
      defaultColor: 'red',
      gender: 'm',
    },
    Pp: {
      label: {
        en: 'Pope',
      },
      compatibleWith: 'DM',
      gender: 'm',
    },
    B: {
      label: {
        en: 'Bishop',
      },
      compatibleWith: 'DM',
      gender: 'm',
    },
    Ab: {
      label: {
        en: 'Abbot',
      },
      compatibleWith: 'DM',
      gender: 'm',
    },
    P: {
      label: {
        en: 'Priest',
      },
      compatibleWith: 'DM',
      gender: 'm',
    },
    R: {
      label: {
        en: () => 'Religious',
      },
      compatibleWith: 'DM',
    },
    H: {
      label: {
        en: 'Hermit',
      },
      compatibleWith: 'DM',
      gender: 'm',
    },
    V: {
      label: {
        en: 'Virgin',
      },
      compatibleWith: 'DM',
      gender: 'f',
    },
    Dn: {
      label: {
        en: 'Deacon',
      },
      compatibleWith: 'DM',
      gender: 'm',
    },
    M: {
      label: {
        en: 'Martyr',
      },
      compatibleWith: 'D',
      defaultColor: 'red',
    },
    D: {
      label: {
        en: ({p}) => 'Doctor' + p('s') + ' of the Church',
      },
    },
  },
  liturgies: {
    adventSunday: {
      label: {
        en: ({weekOfAdvent}) => [
          weekOfAdvent.ordinalText + ' Sunday of Advent',
          weekOfAdvent.ordinalNumber + ' Sunday of Advent',
        ],
      },
      altLabel: {
        en: ({weekOfAdvent}) => weekOfAdvent.number === 3 ? 'Gaudete Sunday' : null,
      },
      rank: 'strongSunday',
      color: ({weekOfAdvent}) => weekOfAdvent.number === 3 ? ['rose', 'violet'] : 'violet',
      when: ({weekOfAdvent, dow}) => weekOfAdvent.hasValue && dow === sun,
    },
    adventWeekday: {
      label: {
        en: ({weekOfAdvent, dowName, dowName3}) => [
          dowName + ' of the ' + weekOfAdvent.ordinalText + ' Week of Advent',
          dowName3 + ' of Advent Week ' + weekOfAdvent.cardinalNumber,
        ],
      },
      rank: 'weakWeekday',
      color: 'violet',
      when: ({weekOfAdvent, dow, mmdd}) => weekOfAdvent.hasValue && mmdd < 1217 && dow > sun,
    },
    andrew: {
      rank: 'feast',
      when: '1130',
    },
    francisXavier: {
      rank: 'memorial',
      when: '1203',
    },
    johnOfDamascus: {
      identifier: {
        en: 'John Damascene',
      },
      rank: 'optionalMemorial',
      when: '1204',
    },
    nicholasOfMyra: {
      identifier: {
        en: 'Nicholas',
      },
      rank: 'optionalMemorial',
      when: '1206',
    },
    ambroseOfMilan: {
      identifier: {
        en: 'Ambrose',
      },
      rank: 'memorial',
      when: '1207',
    },
    immaculateConception: {
      label: {
        en: [
          'The Immaculate Conception of the Blessed Virgin Mary',
          'Immaculate Conception',
        ],
      },
      rank: 'solemnity',
      when: '1208',
      tags: ['mary'],
    },
    juanDiego: {
      rank: 'optionalMemorial',
      when: ({year, mmdd}) => mmdd === 1209 && year >= 2002,
    },
    loreto: {
      label: olo({en: 'Loreto'}),
      rank: 'optionalMemorial',
      when: ({year, mmdd}) => mmdd === 1210 && year >= 2019,
      tags: ['mary'],
    },
    damasusI: {
      rank: 'optionalMemorial',
      when: '1211',
    },
    guadalupe: {
      label: olo({en: 'Guadalupe'}),
      rank: 'optionalMemorial',
      when: ({year, mmdd}) => mmdd === 1212 && year >= 2002,
      tags: ['mary', 'apparition'],
    },
    lucy: {
      rank: 'memorial',
      when: '1213',
    },
    johnOfTheCross: {
      rank: 'memorial',
      when: '1214',
    },
    endOfAdventDay: {
      label: {
        en: ({dowName, dowName3, weekOfAdvent}) => [
          dowName + ' of the ' + weekOfAdvent.ordinalText + ' Week of Advent',
          dowName3 + ' of Advent Week ' + weekOfAdvent.cardinalNumber,
        ],
      },
      altLabel: {
        en: ({day}) => 'O ' + ['Sapientia', 'Adonai', 'Radix Jesse', 'Clavis David', 'Oriens', 'Rex Gentium', 'Emmanuel'][day - 17],
      },
      rank: 'strongWeekday',
      color: 'violet',
      when: ({mmdd}) => mmdd >= 1217 && mmdd <= 1223,
    },
    peterCanisius: {
      rank: 'optionalMemorial',
      when: '1221',
    },
    johnOfKanty: {
      rank: 'optionalMemorial',
      when: '1223',
    },
    dec24: {
      label: {
        en: ({dowName, dowName3, weekOfAdvent}) => [
          dowName + ' of the ' + weekOfAdvent.ordinalText + ' Week of Advent',
          dowName3 + ' of Advent Week ' + weekOfAdvent.cardinalNumber,
        ],
      },
      rank: 'strongWeekday',
      color: 'violet',
      when: '1224',
    },
    christmas: {
      label: {
        en: [
          'The Nativity of the Lord',
          'Nativity of the Lord',
        ],
      },
      altLabel: 'Christmas',
      rank: 'strongSolemnity',
      when: '1225',
    },
    holyFamily: {
      label: {
        en: [
          'The Holy Family of Jesus, Mary and Joseph',
          'The Holy Family',
          'The Holy Family',
          'Holy Family',
        ],
      },
      rank: 'feastOfTheLord',
      when: ({dow, mmdd}) => (mmdd >= 1226 && mmdd <= 1231 && dow === sun) || (mmdd === 1230 && dow === fri),
    },
    stephen: {
      label: {
        en: [
          'Saint Stephen, The First Martyr',
          'St. Stephen, First Martyr',
          'St. Stephen',
          'Stephen',
        ],
      },
      rank: 'feast',
      color: 'red',
      when: '1226',
    },
    john: {
      rank: 'feast',
      color: 'white',
      when: '1227',
    },
    holyInnocents: {
      label: {
        en: [
          'The Holy Innocents, Martyrs',
          'Holy Innocents, M',
          'Holy Innocents',
        ],
      },
      rank: 'feast',
      color: 'red',
      when: '1228',
    },
    christmasOctave: {
      label: {
        en: ({dayOfChristmasAtEndOfYear}) => [
          dayOfChristmasAtEndOfYear.ordinalText + ' Day within the Octave of the Nativity of the Lord',
          'Day ' + dayOfChristmasAtEndOfYear.cardinalNumber + ' of Christmas Octave',
        ],
      },
      rank: 'strongWeekday',
      color: 'white',
      when: ({dayOfChristmasAtEndOfYear, dow}) =>
        dayOfChristmasAtEndOfYear.hasValue && dow !== sun,
    },
    thomasBecket: {
      rank: 'optionalMemorial',
      when: '1229',
    },
    sylvesterI: {
      rank: 'optionalMemorial',
      when: '1231',
    },
    maryMotherOfGod: {
      label: {
        en: [
          'Mary, the Holy Mother of God',
          'Mary, Mother of God',
        ],
      },
      rank: 'solemnity',
      when: '0101',
    },
    christmasWeekday: {
      label: {
        en: ({dayOfChristmasAtBeginningOfYear}) => [
          'The ' + dayOfChristmasAtBeginningOfYear.ordinalText + ' Day of the Christmas Season',
          dayOfChristmasAtBeginningOfYear.ordinalNumber + ' Day of Christmas',
        ],
      },
      rank: 'weakWeekday',
      when: ({dayOfChristmasAtBeginningOfYear}) => dayOfChristmasAtBeginningOfYear.hasValue,
    },
    basilGregory: {
      saints: {
        basilOfCaesarea: {},
        gregoryOfNazianzus: {
          identifier: {
            en: 'Gregory Nazianzen',
          },
        },
      },
      rank: 'memorial',
      when: '0102',
    },
    nameOfJesus: {
      label: {
        en: [
          'The Most Holy Name of Jesus',
          'Holy Name of Jesus',
          'Name of Jesus',
        ],
      },
      rank: 'optionalMemorial',
      when: '0103',
    },
    epiphany: {
      label: {
        en: [
          'The Epiphany of the Lord',
          'Epiphany of the Lord',
          'Epiphany',
        ],
      },
      rank: 'strongSolemnity',
      when: ({day, dow, epiphanyTransferred, month}) =>
        (!epiphanyTransferred && month === jan && day === 6) ||
        (epiphanyTransferred && month === jan && (day >= 2 && day <= 8) && dow === sun),
    },
    raymondOfPenyafort: {
      rank: 'optionalMemorial',
      when: '0107',
    },
    baptism: {
      label: {
        en: [
          'The Baptism of the Lord',
          'Baptism of the Lord',
        ],
      },
      rank: 'feastOfTheLord',
      when: ({dow, epiphanyTransferred, mmdd}) =>
        (!epiphanyTransferred && mmdd >= 107 && mmdd <= 113 && dow === sun) ||
        (epiphanyTransferred && (
          (mmdd >= 108 && mmdd <= 109 && dow === mon) ||
          (mmdd >= 110 && mmdd <= 113 && dow === sun)
        )),
    },
    ordinaryTimeSundayAfterEpiphany: {
      label: {
        en: ({weekOfOrdinaryTimeAfterEpiphany}) => [
          weekOfOrdinaryTimeAfterEpiphany.ordinalText + ' Sunday of Ordinary Time',
          weekOfOrdinaryTimeAfterEpiphany.ordinalNumber + ' Sunday of Ordinary Time',
          'OT Sun ' + weekOfOrdinaryTimeAfterEpiphany.cardinalNumber,
        ],
      },
      rank: 'weakSunday',
      color: 'green',
      when: ({dow, weekOfOrdinaryTimeAfterEpiphany}) =>
        weekOfOrdinaryTimeAfterEpiphany.hasValue && dow === sun,
    },
    ordinaryTimeWeekdayAfterEpiphany: {
      label: {
        en: ({dowName, dowName3, weekOfOrdinaryTimeAfterEpiphany}) => [
          dowName + ' of the ' + weekOfOrdinaryTimeAfterEpiphany.ordinalText + ' Week of Ordinary Time',
          dowName3 + ' of Ordinary Time Week ' + weekOfOrdinaryTimeAfterEpiphany.cardinalNumber,
          dowName3 + ' of OT W' + weekOfOrdinaryTimeAfterEpiphany.cardinalNumber,
        ],
      },
      rank: 'weakWeekday',
      color: 'green',
      when: ({dow, weekOfOrdinaryTimeAfterEpiphany}) =>
        weekOfOrdinaryTimeAfterEpiphany.hasValue && dow > sun,
    },
    hilaryOfPoitiers: {
      identifier: {
        en: 'Hilary',
      },
      rank: 'optionalMemorial',
      when: '0113',
    },
    anthonyOfEgypt: {
      identifier: {
        en: 'Anthony',
      },
      rank: 'memorial',
      when: '0117',
    },
    fabian: {
      rank: 'optionalMemorial',
      when: '0120',
    },
    sebastian: {
      rank: 'optionalMemorial',
      when: '0120',
    },
    agnesOfRome: {
      identifier: {
        en: 'Agnes',
      },
      rank: 'memorial',
      when: '0121',
    },
    vincentOfSaragossa: {
      identifier: {
        en: 'Vincent',
      },
      rank: 'optionalMemorial',
      when: '0122',
    },
    francisDeSales: {
      rank: 'memorial',
      when: '0124',
    },
    conversionOfPaul: {
      label: {
        en: [
          'The Conversion of Saint Paul the Apostle',
          'Conversion of St. Paul',
        ],
      },
      rank: 'feast',
      when: '0125',
    },
    timothyTitus: {
      saints: {
        timothy: {},
        titus: {},
      },
      rank: 'memorial',
      when: '0126',
    },
    angelaMerici: {
      rank: 'optionalMemorial',
      when: '0127',
    },
    thomasAquinas: {
      rank: 'memorial',
      when: '0128',
    },
    johnBosco: {
      rank: 'memorial',
      when: '0131',
    },
    presentation: {
      label: {
        en: [
          'The Presentation of the Lord',
          'Presentation of the Lord',
          'Presentation',
        ],
      },
      altLabel: 'Candlemas',
      rank: 'feastOfTheLord',
      when: '0202',
    },
    blaiseOfSebaste: {
      identifier: {
        en: 'Blaise',
      },
      rank: 'optionalMemorial',
      when: '0203',
    },
    ansgar: {
      rank: 'optionalMemorial',
      when: '0203',
    },
    ashWednesday: {
      label: {
        en: [
          'Ash Wednesday',
        ],
      },
      rank: 'strongDay',
      color: 'violet',
      when: 'ashWednesday',
    },
    dayAfterAshWednesday: {
      label: {
        en: ({dowName}) => [
          dowName + ' after Ash Wednesday',
        ],
      },
      rank: 'strongWeekday',
      color: 'violet',
      when: ({isAfter, isBefore}) =>
        isAfter('ashWednesday') && isBefore('firstSundayOfLent'),
    },
    lentSunday: {
      label: {
        en: ({weekOfLent}) => [
          weekOfLent.ordinalText + ' Sunday of Lent',
          weekOfLent.ordinalNumber + ' Sunday of Lent',
        ],
      },
      altLabel: {
        en: ({weekOfLent}) => weekOfLent.cardinalNumber === 4 ? 'Laetare Sunday' : '',
      },
      rank: 'strongSunday',
      color: ({weekOfLent}) => weekOfLent.cardinalNumber === 4 ? ['rose', 'violet'] : 'violet',
      when: ({dow, weekOfLent}) => weekOfLent.hasValue && dow === sun,
    },
    lentWeekday: {
      label: {
        en: ({dowName, dowName3, weekOfLent}) => [
          dowName + ' of the ' + weekOfLent.ordinalText + ' Week of Lent',
          dowName3 + ' of Lent Week ' + weekOfLent.cardinalNumber,
        ],
      },
      rank: 'strongWeekday',
      color: 'violet',
      when: ({dow, weekOfLent}) => weekOfLent.hasValue && dow > sun,
    },
    agathaOfSicily: {
      identifier: {
        en: 'Agatha',
      },
      rank: 'memorial',
      when: '0205',
    },
    paulMiki: {
      companions: 25,
      rank: 'memorial',
      when: '0206',
    },
    jeromeEmiliani: {
      rank: 'optionalMemorial',
      when: '0208',
    },
    josephineBakhita: {
      rank: 'optionalMemorial',
      when: '0208',
    },
    scholastica: {
      rank: 'memorial',
      when: '0210',
    },
    lourdes: {
      label: olo({en: 'Lourdes'}),
      rank: 'optionalMemorial',
      when: '0211',
    },
    cyrilMethodius: {
      label: {
        en: [
          'Saints Cyril, Monk, and Methodius, Bishop',
          'Sts. Cyril, Monk, and Methodius, B',
          'Sts. Cyril & Methodius',
          'Cyril & Methodius',
        ],
      },
      rank: 'memorial',
      when: '0214',
    },
    serviteFounders: {
      label: {
        en: [
          'The Seven Holy Founders of the Servite Order',
          'Seven Servite Founders',
          'Seven Servite Founders',
          '7 Servite Founders',
        ],
      },
      rank: 'optionalMemorial',
      when: '0217',
    },
    peterDamian: {
      rank: 'optionalMemorial',
      when: '0221',
    },
    chair: {
      label: {
        en: [
          'The Chair of Saint Peter the Apostle',
          'Chair of St. Peter',
        ],
      },
      rank: 'feast',
      when: '0222',
    },
    polycarp: {
      rank: 'memorial',
      when: '0223',
    },
    casimir: {
      rank: 'optionalMemorial',
      when: '0304',
    },
    perpetuaFelicity: {
      saints: {
        perpetua: {},
        felicity: {},
      },
      rank: 'memorial',
      when: '0307',
    },
    johnOfGod: {
      rank: 'optionalMemorial',
      when: '0308',
    },
    francesOfRome: {
      rank: 'optionalMemorial',
      when: '0309',
    },
    patrick: {
      rank: 'optionalMemorial',
      when: '0317',
    },
    cyrilOfJerusalem: {
      rank: 'optionalMemorial',
      when: '0318',
    },
    joseph: {
      epithet: {
        en: [
          'Spouse of the Blessed Virgin Mary',
          'Spouse of Mary',
        ],
      },
      rank: 'solemnity',
      when: '0319',
    },
    turibiusOfMogrovejo: {
      rank: 'optionalMemorial',
      when: '0323',
    },
    annunciation: {
      label: {
        en: [
          'The Annunciation of the Lord',
          'Annunciation of the Lord',
          'Annunciation',
        ],
      },
      rank: 'solemnity',
      when: '0325',
    },
    palmSunday: {
      label: {
        en: [
          'Palm Sunday of the Passion of the Lord',
          'Palm Sunday of the Passion',
          'Palm Sunday',
        ],
      },
      rank: 'strongDay',
      color: 'red',
      when: 'palmSunday',
    },
    holyWeek: {
      label: {
        en: ({dowName}) => dowName + ' of Holy Week',
      },
      rank: 'strongDay',
      color: 'violet',
      when: ({isAfter, isBefore}) => isAfter('palmSunday') && isBefore('holyThursday'),
    },
    holyThursday: {
      label: {
        en: [
          'Thursday of the Lord’s Supper',
          'Holy Thursday',
        ],
      },
      rank: 'strongDay',
      color: 'white',
      when: 'holyThursday',
    },
    goodFriday: {
      label: {
        en: [
          'Friday of the Passion of the Lord',
          'Good Friday',
        ],
      },
      rank: 'strongDay',
      color: 'red',
      when: 'goodFriday',
    },
    holySaturday: {
      label: {
        en: [
          'Holy Saturday',
        ],
      },
      rank: 'strongDay',
      color: 'violet',
      when: ({sub}) => sub('easter', 1),
    },
    easter: {
      label: {
        en: [
          'Easter Sunday of the Resurrection of the Lord',
          'Easter Sunday',
          'Easter',
        ],
      },
      rank: 'strongSolemnity',
      when: 'easter',
    },
    easterWeek: {
      label: {
        en: ({dowName}) => [
          dowName + ' within the Octave of Easter',
          'Easter ' + dowName,
        ],
      },
      rank: 'strongSolemnity',
      when: ({isAfter, isBefore}) => isAfter('easter') && isBefore('divineMercySunday'),
    },
    divineMercySunday: {
      label: {
        en: [
          'Second Sunday of Easter',
          '2nd Sunday of Easter',
        ],
      },
      altLabel: {
        en: 'Divine Mercy Sunday',
      },
      rank: 'strongSolemnity',
      when: 'divineMercySunday',
    },
    easterSunday: {
      label: {
        en: ({weekOfEaster}) => [
          weekOfEaster.ordinalText + ' Sunday of Easter',
          weekOfEaster.ordinalNumber + ' Sunday of Easter',
        ],
      },
      rank: 'strongSunday',
      color: 'white',
      when: ({dow, weekOfEaster}) => weekOfEaster.cardinalNumber >= 3 && dow === sun,
    },
    easterWeekday: {
      label: {
        en: ({dowName, dowName3, weekOfEaster}) => [
          dowName + ' of the ' + weekOfEaster.ordinalText + ' Week of Easter',
          dowName3 + ' of Easter Week ' + weekOfEaster.cardinalNumber,
        ],
      },
      rank: 'weakWeekday',
      color: 'white',
      when: ({dow, weekOfEaster}) => weekOfEaster.cardinalNumber >= 2 && dow > sun,
    },
    francisOfPaola: {
      rank: 'optionalMemorial',
      when: '0402',
    },
    isidoreOfSeville: {
      identifier: {
        en: 'Isidore',
      },
      rank: 'optionalMemorial',
      when: '0404',
    },
    vincentFerrer: {
      rank: 'optionalMemorial',
      when: '0405',
    },
    johnBaptistDeLaSalle: {
      rank: 'memorial',
      when: '0407',
    },
    stanislaus: {
      rank: 'memorial',
      when: '0411',
    },
    martinI: {
      rank: 'optionalMemorial',
      when: '0413',
    },
    anselmOfCanterbury: {
      identifier: {
        en: 'Anselm',
      },
      rank: 'optionalMemorial',
      when: '0421',
    },
    georgeOfLydda: {
      identifier: {
        en: 'George',
      },
      rank: 'optionalMemorial',
      when: '0423',
    },
    adalbertOfPrague: {
      identifier: {
        en: 'Adalbert',
      },
      rank: 'optionalMemorial',
      when: '0423',
    },
    fidelisOfSigmaringen: {
      rank: 'optionalMemorial',
      when: '0424',
    },
    mark: {
      rank: 'feast',
      when: '0425',
    },
    peterChanel: {
      rank: 'optionalMemorial',
      when: '0428',
    },
    louisDeMontfort: {
      rank: 'optionalMemorial',
      when: '0428',
    },
    catherineOfSiena: {
      rank: 'memorial',
      when: '0429',
    },
    piusV: {
      rank: 'optionalMemorial',
      when: '0430',
    },
    ascension: {
      label: {
        en: 'The Ascension of the Lord',
      },
      rank: 'solemnity',
      when: ({ascensionTransferred: t}) =>
        t ? 'sundayAfterAscension' : 'ascension',
    },
    pentecost: {
      label: {
        en: [
          'Pentecost Sunday',
          'Pentecost',
        ],
      },
      rank: 'strongSolemnity',
      color: 'red',
      when: 'pentecost',
    },
    ordinaryTimeSundayAfterPentecost: {
      label: {
        en: ({weekOfOrdinaryTimeAfterPentecost}) => [
          weekOfOrdinaryTimeAfterPentecost.ordinalText + ' Sunday of Ordinary Time',
          weekOfOrdinaryTimeAfterPentecost.ordinalNumber + ' Sunday of Ordinary Time',
        ],
      },
      rank: 'weakSunday',
      color: 'green',
      when: ({dow, weekOfOrdinaryTimeAfterPentecost}) =>
        weekOfOrdinaryTimeAfterPentecost.hasValue && dow === sun,
    },
    ordinaryTimeWeekdayAfterPentecost: {
      label: {
        en: ({dowName, dowName3, weekOfOrdinaryTimeAfterPentecost}) => [
          dowName + ' of the ' + weekOfOrdinaryTimeAfterPentecost.ordinalText + ' Week of Ordinary Time',
          dowName3 + ' of Ordinary Time Week ' + weekOfOrdinaryTimeAfterPentecost.cardinalNumber,
          dowName3 + ' OT W' + weekOfOrdinaryTimeAfterPentecost.cardinalNumber,
        ],
      },
      rank: 'weakWeekday',
      color: 'green',
      when: ({dow, weekOfOrdinaryTimeAfterPentecost}) =>
        weekOfOrdinaryTimeAfterPentecost.hasValue && dow > sun,
    },
    pentecostRepeat: {
      label: {
        en: 'Mass of Pentecost Sunday',
      },
      rank: 'repeatedLiturgy',
      color: 'red',
      when: ({add, isOn, year}) =>
        year <= 2017 && isOn(add('pentecost', 1), add('pentecost', 2)),
    },
    motherOfTheChurch: {
      label: {
        en: 'Mary, Mother of the Church',
      },
      rank: 'memorial',
      when: ({add, isOn, year}) =>
        year >= 2018 && isOn(add('pentecost', 1)),
    },
    marySaturday: {
      label: {
        en: [
          'The Blessed Virgin Mary',
          'Blessed Virgin Mary',
        ],
      },
      rank: 'marySaturday',
      when: ({dow, weekOfOrdinaryTimeAfterEpiphany, weekOfOrdinaryTimeAfterPentecost}) =>
        (weekOfOrdinaryTimeAfterEpiphany.hasValue || weekOfOrdinaryTimeAfterPentecost.hasValue) && dow === sat,
    },
    trinity: {
      label: {
        en: [
          'The Most Holy Trinity',
          'Most Holy Trinity',
        ],
      },
      rank: 'solemnity',
      when: ({add}) => add('pentecost', 1, sun),
    },
    corpusChristi: {
      label: {
        en: [
          'The Most Holy Body and Blood of Christ',
          'Body and Blood of Christ',
        ],
      },
      altLabel: {
        en: 'Corpus Christi',
      },
      rank: 'solemnity',
      when: ({add}) => add('pentecost', 2, thu),
    },
    sacredHeart: {
      label: {
        en: [
          'The Most Sacred Heart of Jesus',
          'Sacred Heart of Jesus',
          'Sacred Heart',
        ],
      },
      rank: 'solemnity',
      when: ({add}) => add('pentecost', 3, fri),
    },
    immaculateHeart: {
      label: {
        en: [
          'The Immaculate Heart of Mary',
          'Immaculate Heart of Mary',
          'Immaculate Heart',
        ],
      },
      rank: 'memorial',
      when: ({add}) => add('pentecost', 3, sat),
    },
    josephTheWorker: {
      label: {
        en: [
          'Saint Joseph the Worker',
          'St. Joseph the Worker',
          'St. Joseph the Worker',
          'Joseph the Worker',
        ],
      },
      rank: 'optionalMemorial',
      when: '0501',
    },
    athanasiusOfAlexandria: {
      identifier: {
        en: 'Athanasius',
      },
      rank: 'memorial',
      when: '0502',
    },
    philipJames: {
      saints: {
        jamesTheLess: {
          identifier: {
            en: 'James',
          },
        },
        philip: {},
      },
      rank: 'feast',
      when: '0503',
    },
    nereusAchilleus: {
      saints: {
        nereus: {},
        achilleus: {},
      },
      rank: 'optionalMemorial',
      when: '0512',
    },
    pancrasOfRome: {
      identifier: {
        en: 'Pancras',
      },
      rank: 'optionalMemorial',
      when: '0512',
    },
    fatima: {
      label: olo({en: 'Fatima'}),
      rank: 'optionalMemorial',
      when: '0513',
    },
    matthias: {
      rank: 'feast',
      when: '0514',
    },
    johnI: {
      rank: 'optionalMemorial',
      when: '0518',
    },
    bernardineOfSiena: {
      rank: 'optionalMemorial',
      when: '0520',
    },
    christopherMagallanes: {
      companions: 24,
      rank: 'optionalMemorial',
      when: '0521',
    },
    ritaOfCascia: {
      rank: 'optionalMemorial',
      when: '0522',
    },
    bede: {
      rank: 'optionalMemorial',
      when: '0525',
    },
    gregoryVII: {
      rank: 'optionalMemorial',
      when: '0525',
    },
    maryMagdaleneDePazzi: {
      rank: 'optionalMemorial',
      when: '0525',
    },
    philipNeri: {
      rank: 'memorial',
      when: '0526',
    },
    augustineOfCanterbury: {
      rank: 'optionalMemorial',
      when: '0527',
    },
    paulVI: {
      rank: 'optionalMemorial',
      when: ({year, mmdd}) => mmdd === 529 && year >= 2019,
    },
    visitation: {
      label: {
        en: [
          'The Visitation of the Blessed Virgin Mary',
          'Visitation of Mary',
          'Visitation of Mary',
          'Visitation',
        ],
      },
      rank: 'feast',
      when: '0531',
    },
    justin: {
      rank: 'memorial',
      when: '0601',
    },
    marcellinusPeter: {
      saints: {
        marcellinus: {},
        peterTheExorcist: {
          identifier: {
            en: 'Peter',
          },
        },
      },
      rank: 'optionalMemorial',
      when: '0602',
    },
    charlesLwanga: {
      companions: 21,
      rank: 'memorial',
      when: '0603',
    },
    boniface: {
      rank: 'memorial',
      when: '0605',
    },
    norbertOfXanten: {
      identifier: {
        en: 'Norbert',
      },
      rank: 'optionalMemorial',
      when: '0606',
    },
    ephremOfSyria: {
      identifier: {
        en: 'Ephrem',
      },
      rank: 'optionalMemorial',
      when: '0609',
    },
    barnabas: {
      rank: 'memorial',
      when: '0611',
    },
    anthonyOfPadua: {
      rank: 'memorial',
      when: '0613',
    },
    romuald: {
      rank: 'optionalMemorial',
      when: '0619',
    },
    aloysiusGonzaga: {
      rank: 'memorial',
      when: '0621',
    },
    paulinusOfNola: {
      rank: 'optionalMemorial',
      when: '0622',
    },
    johnFisherThomasMore: {
      saints: {
        johnFisher: {},
        thomasMore: {},
      },
      rank: 'optionalMemorial',
      when: '0622',
    },
    nativityOfJohnTheBaptist: {
      label: {
        en: [
          'The Nativity of Saint John the Baptist',
          'Nativity of St. John the Baptist',
          'Nativity of St. John the Baptist',
          'Nativity of John the Baptist',
        ],
      },
      rank: 'solemnity',
      when: '0624',
    },
    cyrilOfAlexandria: {
      rank: 'optionalMemorial',
      when: '0627',
    },
    irenaeus: {
      rank: 'memorial',
      when: '0628',
    },
    peterPaul: {
      saints: {
        peter: {},
        paul: {},
      },
      rank: 'solemnity',
      when: '0629',
    },
    martyrsUnderNero: {
      label: {
        en: [
          'The First Martyrs of the Holy Roman Church',
          'First Martyrs of the Roman Church',
          'First Martyrs of the Roman Church',
          'First Roman Martyrs',
        ],
      },
      rank: 'optionalMemorial',
      color: 'red',
      when: '0630',
    },
    thomas: {
      rank: 'feast',
      when: '0703',
    },
    elizabethOfPortugal: {
      rank: 'optionalMemorial',
      when: '0704',
    },
    anthonyZaccaria: {
      rank: 'optionalMemorial',
      when: '0705',
    },
    mariaGoretti: {
      rank: 'optionalMemorial',
      when: '0706',
    },
    augustineZhao: {
      companions: 119,
      rank: 'optionalMemorial',
      when: '0709',
    },
    benedictOfNursia: {
      identifier: {
        en: 'Benedict',
      },
      rank: 'memorial',
      when: '0711',
    },
    henryIIHRE: {
      identifier: {
        en: 'Henry',
      },
      rank: 'optionalMemorial',
      when: '0713',
    },
    camillusDeLellis: {
      rank: 'optionalMemorial',
      when: '0714',
    },
    bonaventure: {
      rank: 'memorial',
      when: '0715',
    },
    mountCarmel: {
      label: olo({en: 'Mount Carmel'}),
      rank: 'optionalMemorial',
      when: '0716',
    },
    apollinarisOfRavenna: {
      identifier: {
        en: 'Apollinaris',
      },
      rank: 'optionalMemorial',
      when: '0720',
    },
    lawrenceOfBrindisi: {
      rank: 'optionalMemorial',
      when: '0721',
    },
    maryMagdalene: {
      rank: ({year}) => year >= 2016 ? 'feast' : 'memorial',
      when: '0722',
    },
    bridgetOfSweden: {
      identifier: {
        en: 'Bridget',
      },
      rank: 'optionalMemorial',
      when: '0723',
    },
    sharbelMakhlouf: {
      rank: 'optionalMemorial',
      when: '0724',
    },
    jamesTheGreat: {
      identifier: {
        en: 'James',
      },
      rank: 'feast',
      when: '0725',
    },
    joachimAnne: {
      saints: {
        joachim: {},
        anne: {},
      },
      epithet: {
        en: 'Parents of the Blessed Virgin Mary',
      },
      rank: 'memorial',
      when: '0726',
    },
    martha: {
      class: '',
      rank: 'memorial',
      when: '0729',
    },
    peterChrysologus: {
      rank: 'optionalMemorial',
      when: '0730',
    },
    ignatiusOfLoyola: {
      rank: 'memorial',
      when: '0731',
    },
    alphonsusLiguori: {
      rank: 'memorial',
      when: '0801',
    },
    eusebiusOfVercelli: {
      rank: 'optionalMemorial',
      when: '0802',
    },
    peterJulianEymard: {
      rank: 'optionalMemorial',
      when: '0802',
    },
    johnVianney: {
      rank: 'memorial',
      when: '0804',
    },
    maryMajor: {
      label: {
        en: [
          'The Dedication of the Basilica of Saint Mary Major',
          'Dedication of St. Mary Major',
        ],
      },
      rank: 'optionalMemorial',
      when: '0805',
    },
    transfiguration: {
      label: {
        en: [
          'The Transfiguration of the Lord',
          'Transfiguration of the Lord',
          'Transfiguration',
        ],
      },
      rank: 'feastOfTheLord',
      when: '0806',
    },
    sixtusII: {
      companions: 2,
      rank: 'optionalMemorial',
      when: '0807',
    },
    cajetan: {
      rank: 'optionalMemorial',
      when: '0807',
    },
    dominic: {
      rank: 'memorial',
      when: '0808',
    },
    edithStein: {
      rank: 'optionalMemorial',
      when: '0809',
    },
    lawrenceOfRome: {
      identifier: {
        en: 'Lawrence',
      },
      rank: 'feast',
      when: '0810',
    },
    clareOfAssisi: {
      identifier: {
        en: 'Clare',
      },
      rank: 'memorial',
      when: '0811',
    },
    janeFrancesDeChantal: {
      rank: 'optionalMemorial',
      when: '0812',
    },
    pontianHippolytus: {
      saints: {
        pontian: {},
        hippolytusOfRome: {
          identifier: {
            en: 'Hippolytus',
          },
        },
      },
      rank: 'optionalMemorial',
      when: '0813',
    },
    maximilianKolbe: {
      rank: 'memorial',
      when: '0814',
    },
    assumption: {
      label: {
        en: [
          'The Assumption of the Blessed Virgin Mary',
          'Assumption of Mary',
          'Assumption of Mary',
          'Assumption',
        ],
      },
      rank: 'solemnity',
      when: '0815',
    },
    stephenIOfHungary: {
      identifier: {
        en: 'Stephen of Hungary',
      },
      rank: 'optionalMemorial',
      when: '0816',
    },
    johnEudes: {
      rank: 'optionalMemorial',
      when: '0819',
    },
    bernardOfClairvaux: {
      identifier: {
        en: 'Bernard',
      },
      rank: 'memorial',
      when: '0820',
    },
    piusX: {
      rank: 'memorial',
      when: '0821',
    },
    maryQueen: {
      label: {
        en: [
          'The Queenship of the Blessed Virgin Mary',
          'Queenship of the Blessed Virgin Mary',
          'Queenship of Mary',
        ],
      },
      rank: 'memorial',
      when: '0822',
    },
    roseOfLima: {
      rank: 'optionalMemorial',
      when: '0823',
    },
    bartholomew: {
      rank: 'feast',
      when: '0824',
    },
    louisIXOfFrance: {
      identifier: {
        en: 'Louis',
      },
      rank: 'optionalMemorial',
      when: '0825',
    },
    josephCalasanz: {
      rank: 'optionalMemorial',
      when: '0825',
    },
    monicaOfHippo: {
      identifier: {
        en: 'Monica',
      },
      rank: 'memorial',
      when: '0827',
    },
    augustineOfHippo: {
      identifier: {
        en: 'Augustine',
      },
      rank: 'memorial',
      when: '0828',
    },
    passionOfJohnTheBaptist: {
      label: {
        en: [
          'The Passion of Saint John the Baptist',
          'Passion of St. John the Baptist',
          'Passion of St. John the Baptist',
          'Passion of John the Baptist',
        ],
      },
      rank: 'memorial',
      color: 'red',
      when: '0829',
    },
    gregoryTheGreat: {
      rank: 'memorial',
      when: '0903',
    },
    nativityOfMary: {
      label: {
        en: [
          'The Nativity of the Blessed Virgin Mary',
          'Nativity of the Blessed Virgin Mary',
          'Nativity of Mary',
        ],
      },
      rank: 'feast',
      when: '0908',
    },
    peterClaver: {
      rank: 'optionalMemorial',
      when: '0909',
    },
    nameOfMary: {
      label: {
        en: [
          'The Most Holy Name of Mary',
          'Holy Name of Mary',
          'Name of Mary',
        ],
      },
      rank: 'optionalMemorial',
      when: '0912',
    },
    johnChrysostom: {
      rank: 'memorial',
      when: '0913',
    },
    cross: {
      label: {
        en: [
          'The Exaltation of the Holy Cross',
          'Exaltation of the Cross',
        ],
      },
      rank: 'feast',
      when: '0914',
    },
    oloSorrows: {
      label: olo({en: 'Sorrows'}),
      rank: 'memorial',
      when: '0915',
    },
    corneliusCyprian: {
      saints: {
        cornelius: {},
        cyprian: {},
      },
      rank: 'memorial',
      when: '0916',
    },
    robertBellarmine: {
      rank: 'optionalMemorial',
      when: '0917',
    },
    januariusOfBenevento: {
      identifier: {
        en: 'Januarius',
      },
      rank: 'optionalMemorial',
      when: '0919',
    },
    koreanMartyrs: {
      saints: {
        andrewKimTaegon: {},
        paulChongHasang: {},
      },
      class: 'M',
      companions: 101,
      rank: 'memorial',
      when: '0920',
    },
    matthew: {
      rank: 'feast',
      when: '0921',
    },
    padrePio: {
      rank: 'memorial',
      when: ({mmdd, year}) => mmdd === 923 && year >= 2002,
    },
    cosmasDamian: {
      saints: {
        cosmas: {},
        damian: {},
      },
      rank: 'optionalMemorial',
      when: '0926',
    },
    vincentDePaul: {
      rank: 'memorial',
      when: '0927',
    },
    wenceslausIOfBohemia: {
      identifier: {
        en: 'Wenceslaus',
      },
      rank: 'optionalMemorial',
      when: '0928',
    },
    lawrenceRuiz: {
      companions: 5,
      rank: 'optionalMemorial',
      when: '0928',
    },
    archangels: {
      label: {
        en: [
          'Saints Michael, Gabriel, and Raphael, Archangels',
          'Sts. Michael, Gabriel, and Raphael',
          'Sts. Michael, Gabriel, & Raphael',
          'Archangels',
        ],
      },
      rank: 'feast',
      when: '0929',
      tags: [
        'angel',
      ],
    },
    jerome: {
      rank: 'memorial',
      when: '0930',
    },
    thereseOfLisieux: {
      rank: 'memorial',
      when: '1001',
    },
    guardianAngels: {
      label: {
        en: [
          'The Holy Guardian Angels',
          'Guardian Angels',
        ],
      },
      rank: 'memorial',
      when: '1002',
      tags: [
        'angel',
      ],
    },
    francisOfAssisi: {
      class: '',
      rank: 'memorial',
      when: '1004',
    },
    brunoOfCologne: {
      identifier: {
        en: 'Bruno',
      },
      rank: 'optionalMemorial',
      when: '1006',
    },
    rosary: {
      label: olo({en: 'the Rosary'}),
      rank: 'memorial',
      when: '1007',
      category: 'mary',
    },
    denisOfParis: {
      identifier: {
        en: 'Denis',
      },
      companions: 2,
      rank: 'optionalMemorial',
      when: '1009',
    },
    johnLeonardi: {
      identifier: {
        en: 'John Leonardi',
      },
      rank: 'optionalMemorial',
      when: '1009',
    },
    johnXXIII: {
      rank: 'optionalMemorial',
      when: ({year, mmdd}) => mmdd === 1011 && year >= 2014,
    },
    callistusI: {
      rank: 'optionalMemorial',
      when: '1014',
    },
    teresaOfAvila: {
      rank: 'memorial',
      when: '1015',
    },
    hedwig: {
      rank: 'optionalMemorial',
      when: '1016',
    },
    margaretMaryAlacoque: {
      rank: 'optionalMemorial',
      when: '1016',
    },
    ignatiusOfAntioch: {
      rank: 'memorial',
      when: '1017',
    },
    luke: {
      rank: 'feast',
      when: '1018',
    },
    northAmericanMartyrs: {
      saints: {
        johnDeBrebeuf: {},
        isaacJogues: {},
      },
      class: 'M',
      companions: 6,
      rank: 'optionalMemorial',
      when: '1019',
    },
    paulOfTheCross: {
      rank: 'optionalMemorial',
      when: '1019',
    },
    johnPaulII: {
      rank: 'optionalMemorial',
      when: ({year, mmdd}) => mmdd === 1022 && year >= 2014,
    },
    johnOfCapistrano: {
      rank: 'optionalMemorial',
      when: '1023',
    },
    anthonyMaryClaret: {
      rank: 'optionalMemorial',
      when: '1024',
    },
    simonJude: {
      saints: {
        simon: {},
        jude: {},
      },
      rank: 'feast',
      when: '1028',
    },
    allSaints: {
      label: {
        en: 'All Saints',
      },
      rank: 'solemnity',
      when: '1101',
    },
    allSouls: {
      label: {
        en: [
          'The Commemoration of All the Faithful Departed',
          'Commemoration of All the Faithful Departed',
          'All the Faithful Departed',
          'All Faithful Departed',
        ],
      },
      altLabel: {
        en: 'All Souls’ Day',
      },
      rank: 'strongDay',
      color: 'violet',
      when: '1102',
    },
    martinDePorres: {
      rank: 'optionalMemorial',
      when: '1103',
    },
    charlesBorromeo: {
      rank: 'memorial',
      when: '1104',
    },
    lateran: {
      label: {
        en: [
          'The Dedication of the Lateran Basilica',
          'Dedication of the Lateran Basilica',
          'Dedication of the Lateran',
          'Lateran',
        ],
      },
      rank: 'feast',
      when: '1109',
    },
    leoTheGreat: {
      rank: 'memorial',
      when: '1110',
    },
    martinOfTours: {
      rank: 'memorial',
      when: '1111',
    },
    josaphatKuntsevych: {
      identifier: {
        en: 'Josaphat',
      },
      rank: 'memorial',
      when: '1112',
    },
    albertTheGreat: {
      rank: 'optionalMemorial',
      when: '1115',
    },
    margaretOfScotland: {
      rank: 'optionalMemorial',
      when: '1116',
    },
    gertrudeTheGreat: {
      identifier: {
        en: 'Gertrude',
      },
      rank: 'optionalMemorial',
      when: '1116',
    },
    elizabethOfHungary: {
      rank: 'memorial',
      when: '1117',
    },
    dedicationOfPeterPaul: {
      label: {
        en: [
          'The Dedication of the Basilicas of Saints Peter and Paul, Apostles',
          'Dedication of Sts. Peter and Paul',
          'Dedication of Sts. Peter & Paul',
          'Dedication of Peter & Paul',
        ],
      },
      rank: 'optionalMemorial',
      when: '1118',
    },
    christTheKing: {
      label: {
        en: [
          'Our Lord Jesus Christ, King of the Universe',
          'Jesus Christ, King of the Universe',
          'Christ the King',
        ],
      },
      rank: 'solemnity',
      when: ({sub}) => sub('firstSundayOfAdvent', 1, sun),
      category: 'jesus',
    },
    presentationOfMary: {
      label: {
        en: [
          'The Presentation of the Blessed Virgin Mary',
          'Presentation of Mary',
        ],
      },
      rank: 'memorial',
      when: '1121',
    },
    cecilia: {
      rank: 'memorial',
      when: '1122',
    },
    clementI: {
      rank: 'optionalMemorial',
      when: '1123',
    },
    columban: {
      rank: 'optionalMemorial',
      when: '1123',
    },
    andrewDungLac: {
      companions: true,
      rank: 'memorial',
      when: '1124',
    },
    catherineOfAlexandria: {
      rank: 'optionalMemorial',
      when: '1125',
    },
  },
  ranks: {
    strongDay: {
      precedence: 1,
      exclusive: true,
    },
    strongSolemnity: {
      label: {
        en: 'Solemnity',
      },
      color: 'white',
      precedence: 1,
      exclusive: true,
    },
    strongSunday: {
      precedence: 2,
      exclusive: true,
    },
    solemnity: {
      label: {
        en: 'Solemnity',
      },
      color: 'white',
      precedence: 3,
      exclusive: true,
      ifOutranked: ({transfer}) => transfer('after'),
    },
    feastOfTheLord: {
      label: {
        en: 'Feast',
      },
      color: 'white',
      precedence: 5,
      exclusive: true,
    },
    weakSunday: {
      precedence: 6,
      exclusive: true,
      ifOutranked: ({omit}) => omit(),
    },
    feast: {
      label: {
        en: 'Feast',
      },
      color: 'white',
      precedence: 7,
      exclusive: true,
    },
    strongWeekday: {
      precedence: 9,
      ifOutranked: ({omit}) => omit(),
    },
    memorial: {
      label: {
        en: 'Memorial',
      },
      commemorationName: {
        en: 'Optional Commemoration',
      },
      color: 'white',
      precedence: 10,
      exclusive: true,
      ifOutranked: ({commemorate, suppress, topRank}) =>
        topRank === 'strongWeekday' ? commemorate() : suppress(),
    },
    optionalMemorial: {
      label: {
        en: 'Optional Memorial',
      },
      commemorationName: {
        en: 'Optional Commemoration',
      },
      color: 'white',
      precedence: 12,
      ifOutranked: ({commemorate, suppress, topRank}) =>
        topRank === 'strongWeekday' ? commemorate() : suppress(),
    },
    marySaturday: {
      label: {
        en: 'Optional Memorial',
      },
      color: 'white',
      precedence: 12,
      ifOutranked: ({omit}) => omit(),
    },
    repeatedLiturgy: {
      label: {
        en: 'Optional Repeated Liturgy',
      },
      precedence: 12,
    },
    weakWeekday: {
      precedence: 13,
      color: 'green',
      ifOutranked: ({omit, topRank}) =>
        ['optionalMemorial', 'marySaturday', 'repeatedLiturgy'].includes(topRank) ? null : omit(),
    },
  },
  defaultColor: 'white',
  colors: {
    green: {
      bg: '#008000',
      fg: '#ffffff',
    },
    violet: {
      bg: '#7f00ff',
      fg: '#ffffff',
    },
    rose: {
      bg: '#fbcce7',
      fg: '#000000',
    },
    white: {
      bg: '#ffffff',
      fg: '#000000',
    },
    red: {
      bg: '#ff0000',
      fg: '#ffffff',
    },
    black: {
      bg: '#000000',
      fg: '#ffffff',
    },
  },
  fastTypes: {
    abstinence: {
      label: {
        en: 'Abstinence',
      },
    },
    fastingAndAbstinence: {
      label: {
        en: 'Fasting and Abstinence',
      },
    },
  },
  fasts: {
    fridays: {
      when: ({dow, topRank}) => dow === fri && !topRank.endsWith('olemnity'),
      type: 'abstinence',
    },
    ashWednesday: {
      when: 'ashWednesday',
      type: 'fastingAndAbstinence',
    },
    goodFriday: {
      when: 'goodFriday',
      type: 'fastingAndAbstinence',
    },
  },
}
