import {
  bx as replaceable,
  u as h,
  by as toDate$1,
  bz as startOfWeek,
  bA as getDefaultOptions$1,
  bB as isSameWeek,
  b0 as createInjectionKey,
  ba as inject,
  z as computed,
  a1 as ref,
  bC as nextTick,
  ah as watch,
  t as defineComponent,
  aW as Scrollbar,
  b6 as resolveWrappedSlot,
  bD as XButton,
  bE as resolveSlotWithTypedProps,
  aa as Button,
  a2 as onMounted,
  bF as Binder,
  bG as VTarget,
  bH as VFollower,
  br as Transition,
  P as withDirectives,
  bI as getPreciseEventTarget,
  bJ as clickoutside,
  b3 as resolveSlot,
  bK as throwError,
  r as c,
  s as cB,
  b1 as cM,
  bL as fadeInScaleUpTransition,
  b2 as cE,
  bM as cNotM,
  b4 as NBaseIcon,
  bN as useAdjustedTo,
  x as useConfig,
  bO as useFormItem,
  y as useTheme,
  bP as timePickerLight,
  b7 as toRef,
  b8 as useMergedState,
  bb as useThemeClass,
  bQ as isMounted,
  bR as markEventEffectPerformed,
  bf as call,
  bk as provide,
  bt as watchEffect,
  bS as datePickerLight,
  bT as warn,
  A as createKey,
  aG as useUserStore,
  a4 as reactive,
  L as createElementBlock,
  M as createBaseVNode,
  a5 as createBlock,
  a8 as createCommentVNode,
  H as createVNode,
  O as unref,
  bU as __unplugin_components_0,
  T as withCtx,
  F as Fragment,
  bV as ServUserDetail,
  U as openBlock,
  V as createTextVNode,
  R as toDisplayString,
  aI as useRouter,
  a7 as __unplugin_components_1$1,
  bW as ServUserUpdate,
  W as _export_sfc
} from './index-CP-MMhae.js'
import { A as AvatarCropper } from './AvatarCropper-B00flI7D.js'
import { h as hidePhone } from './string-g9b8veVd.js'
import { u as useInject } from './useInject-KwKquBHc.js'
import {
  a as __unplugin_components_7$1,
  _ as __unplugin_components_3
} from './FormItem-BYV9eAmm.js'
import {
  _ as __unplugin_components_2,
  a as __unplugin_components_0$1
} from './RadioGroup-SjOLBydD.js'
import { e as enUS, u as useLocale } from './use-locale-sP6dOhdq.js'
import { u as useKeyboard, h as happensIn } from './Dropdown-BaOl703U.js'
import { V as VVirtualList } from './VirtualList-B9WzfpoZ.js'
import { F as FocusDetector } from './FocusDetector-ChBbaXut.js'
import {
  F as FastBackwardIcon,
  B as BackwardIcon,
  a as ForwardIcon,
  b as FastForwardIcon
} from './Forward-4PkzUOWo.js'
import { _ as __unplugin_components_1 } from './Input-9scKSWkl.js'
import './UploadOne-CHKc3agb.js'
import './Undo-DAYaSkZ9.js'
import './Close-BsKkRN62.js'
import './SendOne-Ck-Fsq0E.js'
const DateIcon = replaceable('date', () =>
  h(
    'svg',
    {
      width: '28px',
      height: '28px',
      viewBox: '0 0 28 28',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    h(
      'g',
      {
        stroke: 'none',
        'stroke-width': '1',
        'fill-rule': 'evenodd'
      },
      h(
        'g',
        {
          'fill-rule': 'nonzero'
        },
        h('path', {
          d: 'M21.75,3 C23.5449254,3 25,4.45507456 25,6.25 L25,21.75 C25,23.5449254 23.5449254,25 21.75,25 L6.25,25 C4.45507456,25 3,23.5449254 3,21.75 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L21.75,3 Z M23.5,9.503 L4.5,9.503 L4.5,21.75 C4.5,22.7164983 5.28350169,23.5 6.25,23.5 L21.75,23.5 C22.7164983,23.5 23.5,22.7164983 23.5,21.75 L23.5,9.503 Z M21.75,4.5 L6.25,4.5 C5.28350169,4.5 4.5,5.28350169 4.5,6.25 L4.5,8.003 L23.5,8.003 L23.5,6.25 C23.5,5.28350169 22.7164983,4.5 21.75,4.5 Z'
        })
      )
    )
  )
)
const TimeIcon = replaceable('time', () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 512 512'
    },
    h('path', {
      d: 'M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z',
      style:
        '\n        fill: none;\n        stroke: currentColor;\n        stroke-miterlimit: 10;\n        stroke-width: 32px;\n      '
    }),
    h('polyline', {
      points: '256 128 256 272 352 272',
      style:
        '\n        fill: none;\n        stroke: currentColor;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        stroke-width: 32px;\n      '
    })
  )
)
const ToIcon = replaceable('to', () =>
  h(
    'svg',
    {
      viewBox: '0 0 20 20',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    h(
      'g',
      {
        stroke: 'none',
        'stroke-width': '1',
        fill: 'none',
        'fill-rule': 'evenodd'
      },
      h(
        'g',
        {
          fill: 'currentColor',
          'fill-rule': 'nonzero'
        },
        h('path', {
          d: 'M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z'
        })
      )
    )
  )
)
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value)
  } else {
    return new Date(value)
  }
}
function addDays(date, amount) {
  const _date = toDate$1(date)
  if (isNaN(amount)) return constructFrom(date, NaN)
  if (!amount) {
    return _date
  }
  _date.setDate(_date.getDate() + amount)
  return _date
}
function addMonths(date, amount) {
  const _date = toDate$1(date)
  if (isNaN(amount)) return constructFrom(date, NaN)
  if (!amount) {
    return _date
  }
  const dayOfMonth = _date.getDate()
  const endOfDesiredMonth = constructFrom(date, _date.getTime())
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0)
  const daysInMonth = endOfDesiredMonth.getDate()
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth
  } else {
    _date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth)
    return _date
  }
}
const millisecondsInWeek = 6048e5
const millisecondsInDay = 864e5
const millisecondsInMinute = 6e4
const millisecondsInHour = 36e5
const millisecondsInSecond = 1e3
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 })
}
function getISOWeekYear(date) {
  const _date = toDate$1(date)
  const year = _date.getFullYear()
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0)
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}
function startOfDay(date) {
  const _date = toDate$1(date)
  _date.setHours(0, 0, 0, 0)
  return _date
}
function getTimezoneOffsetInMilliseconds$1(date) {
  const _date = toDate$1(date)
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  )
  utcDate.setUTCFullYear(_date.getFullYear())
  return +date - +utcDate
}
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft)
  const startOfDayRight = startOfDay(dateRight)
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds$1(startOfDayLeft)
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds$1(startOfDayRight)
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay)
}
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date)
  const fourthOfJanuary = constructFrom(date, 0)
  fourthOfJanuary.setFullYear(year, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  return startOfISOWeek(fourthOfJanuary)
}
function addQuarters(date, amount) {
  const months = amount * 3
  return addMonths(date, months)
}
function addYears(date, amount) {
  return addMonths(date, amount * 12)
}
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = startOfDay(dateLeft)
  const dateRightStartOfDay = startOfDay(dateRight)
  return +dateLeftStartOfDay === +dateRightStartOfDay
}
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]')
  )
}
function isValid(date) {
  if (!isDate(date) && typeof date !== 'number') {
    return false
  }
  const _date = toDate$1(date)
  return !isNaN(Number(_date))
}
function getQuarter(date) {
  const _date = toDate$1(date)
  const quarter = Math.trunc(_date.getMonth() / 3) + 1
  return quarter
}
function startOfMinute(date) {
  const _date = toDate$1(date)
  _date.setSeconds(0, 0)
  return _date
}
function startOfQuarter(date) {
  const _date = toDate$1(date)
  const currentMonth = _date.getMonth()
  const month = currentMonth - (currentMonth % 3)
  _date.setMonth(month, 1)
  _date.setHours(0, 0, 0, 0)
  return _date
}
function startOfMonth(date) {
  const _date = toDate$1(date)
  _date.setDate(1)
  _date.setHours(0, 0, 0, 0)
  return _date
}
function startOfYear(date) {
  const cleanDate = toDate$1(date)
  const _date = constructFrom(date, 0)
  _date.setFullYear(cleanDate.getFullYear(), 0, 1)
  _date.setHours(0, 0, 0, 0)
  return _date
}
function getDayOfYear(date) {
  const _date = toDate$1(date)
  const diff = differenceInCalendarDays(_date, startOfYear(_date))
  const dayOfYear = diff + 1
  return dayOfYear
}
function getISOWeek(date) {
  const _date = toDate$1(date)
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date)
  return Math.round(diff / millisecondsInWeek) + 1
}
function getWeekYear(date, options) {
  const _date = toDate$1(date)
  const year = _date.getFullYear()
  const defaultOptions = getDefaultOptions$1()
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1
  const firstWeekOfNextYear = constructFrom(date, 0)
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate)
  firstWeekOfNextYear.setHours(0, 0, 0, 0)
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options)
  const firstWeekOfThisYear = constructFrom(date, 0)
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate)
  firstWeekOfThisYear.setHours(0, 0, 0, 0)
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options)
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}
function startOfWeekYear(date, options) {
  const defaultOptions = getDefaultOptions$1()
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1
  const year = getWeekYear(date, options)
  const firstWeek = constructFrom(date, 0)
  firstWeek.setFullYear(year, 0, firstWeekContainsDate)
  firstWeek.setHours(0, 0, 0, 0)
  const _date = startOfWeek(firstWeek, options)
  return _date
}
function getWeek(date, options) {
  const _date = toDate$1(date)
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options)
  return Math.round(diff / millisecondsInWeek) + 1
}
function addLeadingZeros$1(number, targetLength) {
  const sign = number < 0 ? '-' : ''
  const output = Math.abs(number).toString().padStart(targetLength, '0')
  return sign + output
}
const lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear()
    const year = signedYear > 0 ? signedYear : 1 - signedYear
    return addLeadingZeros$1(token === 'yy' ? year % 100 : year, token.length)
  },
  // Month
  M(date, token) {
    const month = date.getMonth()
    return token === 'M' ? String(month + 1) : addLeadingZeros$1(month + 1, 2)
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros$1(date.getDate(), token.length)
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? 'pm' : 'am'
    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase()
      case 'aaa':
        return dayPeriodEnumValue
      case 'aaaaa':
        return dayPeriodEnumValue[0]
      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.'
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros$1(date.getHours() % 12 || 12, token.length)
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros$1(date.getHours(), token.length)
  },
  // Minute
  m(date, token) {
    return addLeadingZeros$1(date.getMinutes(), token.length)
  },
  // Second
  s(date, token) {
    return addLeadingZeros$1(date.getSeconds(), token.length)
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length
    const milliseconds = date.getMilliseconds()
    const fractionalSeconds = Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3))
    return addLeadingZeros$1(fractionalSeconds, token.length)
  }
}
const dayPeriodEnum = {
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
}
const formatters$1 = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, { width: 'abbreviated' })
      // A, B
      case 'GGGGG':
        return localize.era(era, { width: 'narrow' })
      // Anno Domini, Before Christ
      case 'GGGG':
      default:
        return localize.era(era, { width: 'wide' })
    }
  },
  // Year
  y: function (date, token, localize) {
    if (token === 'yo') {
      const signedYear = date.getFullYear()
      const year = signedYear > 0 ? signedYear : 1 - signedYear
      return localize.ordinalNumber(year, { unit: 'year' })
    }
    return lightFormatters.y(date, token)
  },
  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear
    if (token === 'YY') {
      const twoDigitYear = weekYear % 100
      return addLeadingZeros$1(twoDigitYear, 2)
    }
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, { unit: 'year' })
    }
    return addLeadingZeros$1(weekYear, token.length)
  },
  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = getISOWeekYear(date)
    return addLeadingZeros$1(isoWeekYear, token.length)
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear()
    return addLeadingZeros$1(year, token.length)
  },
  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3)
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter)
      // 01, 02, 03, 04
      case 'QQ':
        return addLeadingZeros$1(quarter, 2)
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return localize.ordinalNumber(quarter, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        })
      // 1st quarter, 2nd quarter, ...
      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3)
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter)
      // 01, 02, 03, 04
      case 'qq':
        return addLeadingZeros$1(quarter, 2)
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return localize.ordinalNumber(quarter, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        })
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        })
      // 1st quarter, 2nd quarter, ...
      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        })
    }
  },
  // Month
  M: function (date, token, localize) {
    const month = date.getMonth()
    switch (token) {
      case 'M':
      case 'MM':
        return lightFormatters.M(date, token)
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return localize.ordinalNumber(month + 1, { unit: 'month' })
      // Jan, Feb, ..., Dec
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // J, F, ..., D
      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        })
      // January, February, ..., December
      case 'MMMM':
      default:
        return localize.month(month, { width: 'wide', context: 'formatting' })
    }
  },
  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth()
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1)
      // 01, 02, ..., 12
      case 'LL':
        return addLeadingZeros$1(month + 1, 2)
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return localize.ordinalNumber(month + 1, { unit: 'month' })
      // Jan, Feb, ..., Dec
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        })
      // J, F, ..., D
      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        })
      // January, February, ..., December
      case 'LLLL':
      default:
        return localize.month(month, { width: 'wide', context: 'standalone' })
    }
  },
  // Local week of year
  w: function (date, token, localize, options) {
    const week = getWeek(date, options)
    if (token === 'wo') {
      return localize.ordinalNumber(week, { unit: 'week' })
    }
    return addLeadingZeros$1(week, token.length)
  },
  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = getISOWeek(date)
    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, { unit: 'week' })
    }
    return addLeadingZeros$1(isoWeek, token.length)
  },
  // Day of the month
  d: function (date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getDate(), { unit: 'date' })
    }
    return lightFormatters.d(date, token)
  },
  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = getDayOfYear(date)
    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, { unit: 'dayOfYear' })
    }
    return addLeadingZeros$1(dayOfYear, token.length)
  },
  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay()
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // T
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        })
      // Tuesday
      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay()
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek)
      // Padded numerical value
      case 'ee':
        return addLeadingZeros$1(localDayOfWeek, 2)
      // 1st, 2nd, ..., 7th
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, { unit: 'day' })
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // T
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        })
      // Tuesday
      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay()
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7
    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek)
      // Padded numerical value
      case 'cc':
        return addLeadingZeros$1(localDayOfWeek, token.length)
      // 1st, 2nd, ..., 7th
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, { unit: 'day' })
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        })
      // T
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        })
      // Tu
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        })
      // Tuesday
      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        })
    }
  },
  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay()
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek
    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek)
      // 02
      case 'ii':
        return addLeadingZeros$1(isoDayOfWeek, token.length)
      // 2nd
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, { unit: 'day' })
      // Tue
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // T
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        })
      // Tuesday
      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours()
    const dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am'
    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        })
      case 'aaa':
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          })
          .toLowerCase()
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours()
    let dayPeriodEnumValue
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am'
    }
    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        })
      case 'bbb':
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          })
          .toLowerCase()
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours()
    let dayPeriodEnumValue
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night
    }
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        })
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },
  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === 'ho') {
      let hours = date.getHours() % 12
      if (hours === 0) hours = 12
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }
    return lightFormatters.h(date, token)
  },
  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getHours(), { unit: 'hour' })
    }
    return lightFormatters.H(date, token)
  },
  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12
    if (token === 'Ko') {
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }
    return addLeadingZeros$1(hours, token.length)
  },
  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours()
    if (hours === 0) hours = 24
    if (token === 'ko') {
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }
    return addLeadingZeros$1(hours, token.length)
  },
  // Minute
  m: function (date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getMinutes(), { unit: 'minute' })
    }
    return lightFormatters.m(date, token)
  },
  // Second
  s: function (date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getSeconds(), { unit: 'second' })
    }
    return lightFormatters.s(date, token)
  },
  // Fraction of second
  S: function (date, token) {
    return lightFormatters.S(date, token)
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset()
    if (timezoneOffset === 0) {
      return 'Z'
    }
    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes$1(timezoneOffset)
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX':
        return formatTimezone$1(timezoneOffset)
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX':
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone$1(timezoneOffset, ':')
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset()
    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes$1(timezoneOffset)
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx':
        return formatTimezone$1(timezoneOffset)
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx':
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone$1(timezoneOffset, ':')
    }
  },
  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset()
    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort$1(timezoneOffset, ':')
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone$1(timezoneOffset, ':')
    }
  },
  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset()
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort$1(timezoneOffset, ':')
      // Long
      case 'zzzz':
      default:
        return 'GMT' + formatTimezone$1(timezoneOffset, ':')
    }
  },
  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3)
    return addLeadingZeros$1(timestamp, token.length)
  },
  // Milliseconds timestamp
  T: function (date, token, _localize) {
    const timestamp = date.getTime()
    return addLeadingZeros$1(timestamp, token.length)
  }
}
function formatTimezoneShort$1(offset, delimiter = '') {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = Math.trunc(absOffset / 60)
  const minutes = absOffset % 60
  if (minutes === 0) {
    return sign + String(hours)
  }
  return sign + String(hours) + delimiter + addLeadingZeros$1(minutes, 2)
}
function formatTimezoneWithOptionalMinutes$1(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? '-' : '+'
    return sign + addLeadingZeros$1(Math.abs(offset) / 60, 2)
  }
  return formatTimezone$1(offset, delimiter)
}
function formatTimezone$1(offset, delimiter = '') {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = addLeadingZeros$1(Math.trunc(absOffset / 60), 2)
  const minutes = addLeadingZeros$1(absOffset % 60, 2)
  return sign + hours + delimiter + minutes
}
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case 'P':
      return formatLong.date({ width: 'short' })
    case 'PP':
      return formatLong.date({ width: 'medium' })
    case 'PPP':
      return formatLong.date({ width: 'long' })
    case 'PPPP':
    default:
      return formatLong.date({ width: 'full' })
  }
}
const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case 'p':
      return formatLong.time({ width: 'short' })
    case 'pp':
      return formatLong.time({ width: 'medium' })
    case 'ppp':
      return formatLong.time({ width: 'long' })
    case 'pppp':
    default:
      return formatLong.time({ width: 'full' })
  }
}
const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || []
  const datePattern = matchResult[1]
  const timePattern = matchResult[2]
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong)
  }
  let dateTimeFormat
  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({ width: 'short' })
      break
    case 'PP':
      dateTimeFormat = formatLong.dateTime({ width: 'medium' })
      break
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({ width: 'long' })
      break
    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({ width: 'full' })
      break
  }
  return dateTimeFormat
    .replace('{{date}}', dateLongFormatter(datePattern, formatLong))
    .replace('{{time}}', timeLongFormatter(timePattern, formatLong))
}
const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
}
const dayOfYearTokenRE = /^D+$/
const weekYearTokenRE = /^Y+$/
const throwTokens = ['D', 'DD', 'YY', 'YYYY']
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token)
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token)
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input)
  console.warn(_message)
  if (throwTokens.includes(token)) throw new RangeError(_message)
}
function message(token, format2, input) {
  const subject = token[0] === 'Y' ? 'years' : 'days of the month'
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`
}
const formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g
const longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g
const escapedStringRegExp$1 = /^'([^]*?)'?$/
const doubleQuoteRegExp$1 = /''/g
const unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/
function format$1(date, formatStr, options) {
  const defaultOptions = getDefaultOptions$1()
  const locale = options?.locale ?? defaultOptions.locale ?? enUS
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0
  const originalDate = toDate$1(date)
  if (!isValid(originalDate)) {
    throw new RangeError('Invalid time value')
  }
  let parts = formatStr
    .match(longFormattingTokensRegExp$1)
    .map((substring) => {
      const firstCharacter = substring[0]
      if (firstCharacter === 'p' || firstCharacter === 'P') {
        const longFormatter = longFormatters[firstCharacter]
        return longFormatter(substring, locale.formatLong)
      }
      return substring
    })
    .join('')
    .match(formattingTokensRegExp$1)
    .map((substring) => {
      if (substring === "''") {
        return { isToken: false, value: "'" }
      }
      const firstCharacter = substring[0]
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString$1(substring) }
      }
      if (formatters$1[firstCharacter]) {
        return { isToken: true, value: substring }
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
        throw new RangeError(
          'Format string contains an unescaped latin alphabet character `' + firstCharacter + '`'
        )
      }
      return { isToken: false, value: substring }
    })
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts)
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  }
  return parts
    .map((part) => {
      if (!part.isToken) return part.value
      const token = part.value
      if (
        (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) ||
        (!options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token))
      ) {
        warnOrThrowProtectedError(token, formatStr, String(date))
      }
      const formatter = formatters$1[token[0]]
      return formatter(originalDate, token, locale.localize, formatterOptions)
    })
    .join('')
}
function cleanEscapedString$1(input) {
  const matched = input.match(escapedStringRegExp$1)
  if (!matched) {
    return input
  }
  return matched[1].replace(doubleQuoteRegExp$1, "'")
}
function getDate(date) {
  const _date = toDate$1(date)
  const dayOfMonth = _date.getDate()
  return dayOfMonth
}
function getDay(date) {
  const _date = toDate$1(date)
  const day = _date.getDay()
  return day
}
function getDaysInMonth(date) {
  const _date = toDate$1(date)
  const year = _date.getFullYear()
  const monthIndex = _date.getMonth()
  const lastDayOfMonth = constructFrom(date, 0)
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
  lastDayOfMonth.setHours(0, 0, 0, 0)
  return lastDayOfMonth.getDate()
}
function getDefaultOptions() {
  return Object.assign({}, getDefaultOptions$1())
}
function getHours(date) {
  const _date = toDate$1(date)
  const hours = _date.getHours()
  return hours
}
function getISODay(date) {
  const _date = toDate$1(date)
  let day = _date.getDay()
  if (day === 0) {
    day = 7
  }
  return day
}
function getMilliseconds(date) {
  const _date = toDate$1(date)
  const milliseconds = _date.getMilliseconds()
  return milliseconds
}
function getMinutes(date) {
  const _date = toDate$1(date)
  const minutes = _date.getMinutes()
  return minutes
}
function getMonth(date) {
  const _date = toDate$1(date)
  const month = _date.getMonth()
  return month
}
function getSeconds(date) {
  const _date = toDate$1(date)
  const seconds = _date.getSeconds()
  return seconds
}
function getTime(date) {
  const _date = toDate$1(date)
  const timestamp = _date.getTime()
  return timestamp
}
function getYear(date) {
  return toDate$1(date).getFullYear()
}
function transpose(fromDate, constructor) {
  const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0)
  date.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
  date.setHours(
    fromDate.getHours(),
    fromDate.getMinutes(),
    fromDate.getSeconds(),
    fromDate.getMilliseconds()
  )
  return date
}
const TIMEZONE_UNIT_PRIORITY = 10
class Setter {
  subPriority = 0
  validate(_utcDate, _options) {
    return true
  }
}
class ValueSetter extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super()
    this.value = value
    this.validateValue = validateValue
    this.setValue = setValue
    this.priority = priority
    if (subPriority) {
      this.subPriority = subPriority
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options)
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options)
  }
}
class DateToSystemTimezoneSetter extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY
  subPriority = -1
  set(date, flags) {
    if (flags.timestampIsSet) return date
    return constructFrom(date, transpose(date, Date))
  }
}
class Parser {
  run(dateString, token, match, options) {
    const result = this.parse(dateString, token, match, options)
    if (!result) {
      return null
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    }
  }
  validate(_utcDate, _value, _options) {
    return true
  }
}
class EraParser extends Parser {
  priority = 140
  parse(dateString, token, match) {
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return (
          match.era(dateString, { width: 'abbreviated' }) ||
          match.era(dateString, { width: 'narrow' })
        )
      // A, B
      case 'GGGGG':
        return match.era(dateString, { width: 'narrow' })
      // Anno Domini, Before Christ
      case 'GGGG':
      default:
        return (
          match.era(dateString, { width: 'wide' }) ||
          match.era(dateString, { width: 'abbreviated' }) ||
          match.era(dateString, { width: 'narrow' })
        )
    }
  }
  set(date, flags, value) {
    flags.era = value
    date.setFullYear(value, 0, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['R', 'u', 't', 'T']
}
const numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}
const timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
}
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  }
}
function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern)
  if (!matchResult) {
    return null
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  }
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern)
  if (!matchResult) {
    return null
  }
  if (matchResult[0] === 'Z') {
    return {
      value: 0,
      rest: dateString.slice(1)
    }
  }
  const sign = matchResult[1] === '+' ? 1 : -1
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0
  return {
    value:
      sign *
      (hours * millisecondsInHour +
        minutes * millisecondsInMinute +
        seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  }
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString)
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString)
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString)
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString)
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString)
    default:
      return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), dateString)
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString)
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString)
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString)
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString)
    default:
      return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), dateString)
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case 'morning':
      return 4
    case 'evening':
      return 17
    case 'pm':
    case 'noon':
    case 'afternoon':
      return 12
    case 'am':
    case 'midnight':
    case 'night':
    default:
      return 0
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear
  let result
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100
  } else {
    const rangeEnd = absCurrentYear + 50
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0)
  }
  return isCommonEra ? result : 1 - result
}
function isLeapYearIndex$1(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}
class YearParser extends Parser {
  priority = 130
  incompatibleTokens = ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']
  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === 'yy'
    })
    switch (token) {
      case 'y':
        return mapValue(parseNDigits(4, dateString), valueCallback)
      case 'yo':
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: 'year'
          }),
          valueCallback
        )
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback)
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear()
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear)
      date.setFullYear(normalizedTwoDigitYear, 0, 1)
      date.setHours(0, 0, 0, 0)
      return date
    }
    const year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year
    date.setFullYear(year, 0, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
}
class LocalWeekYearParser extends Parser {
  priority = 130
  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === 'YY'
    })
    switch (token) {
      case 'Y':
        return mapValue(parseNDigits(4, dateString), valueCallback)
      case 'Yo':
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: 'year'
          }),
          valueCallback
        )
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback)
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options)
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear)
      date.setFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate)
      date.setHours(0, 0, 0, 0)
      return startOfWeek(date, options)
    }
    const year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year
    date.setFullYear(year, 0, options.firstWeekContainsDate)
    date.setHours(0, 0, 0, 0)
    return startOfWeek(date, options)
  }
  incompatibleTokens = ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
}
class ISOWeekYearParser extends Parser {
  priority = 130
  parse(dateString, token) {
    if (token === 'R') {
      return parseNDigitsSigned(4, dateString)
    }
    return parseNDigitsSigned(token.length, dateString)
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0)
    firstWeekOfYear.setFullYear(value, 0, 4)
    firstWeekOfYear.setHours(0, 0, 0, 0)
    return startOfISOWeek(firstWeekOfYear)
  }
  incompatibleTokens = ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
}
class ExtendedYearParser extends Parser {
  priority = 130
  parse(dateString, token) {
    if (token === 'u') {
      return parseNDigitsSigned(4, dateString)
    }
    return parseNDigitsSigned(token.length, dateString)
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']
}
class QuarterParser extends Parser {
  priority = 120
  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
      case 'QQ':
        return parseNDigits(token.length, dateString)
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return match.ordinalNumber(dateString, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return (
          match.quarter(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.quarter(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return match.quarter(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      // 1st quarter, 2nd quarter, ...
      case 'QQQQ':
      default:
        return (
          match.quarter(dateString, {
            width: 'wide',
            context: 'formatting'
          }) ||
          match.quarter(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.quarter(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
}
class StandAloneQuarterParser extends Parser {
  priority = 120
  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
      case 'qq':
        return parseNDigits(token.length, dateString)
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return match.ordinalNumber(dateString, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return (
          match.quarter(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) ||
          match.quarter(dateString, {
            width: 'narrow',
            context: 'standalone'
          })
        )
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return match.quarter(dateString, {
          width: 'narrow',
          context: 'standalone'
        })
      // 1st quarter, 2nd quarter, ...
      case 'qqqq':
      default:
        return (
          match.quarter(dateString, {
            width: 'wide',
            context: 'standalone'
          }) ||
          match.quarter(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) ||
          match.quarter(dateString, {
            width: 'narrow',
            context: 'standalone'
          })
        )
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
}
class MonthParser extends Parser {
  incompatibleTokens = ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  priority = 110
  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1
    switch (token) {
      // 1, 2, ..., 12
      case 'M':
        return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback)
      // 01, 02, ..., 12
      case 'MM':
        return mapValue(parseNDigits(2, dateString), valueCallback)
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: 'month'
          }),
          valueCallback
        )
      // Jan, Feb, ..., Dec
      case 'MMM':
        return (
          match.month(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(dateString, { width: 'narrow', context: 'formatting' })
        )
      // J, F, ..., D
      case 'MMMMM':
        return match.month(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      // January, February, ..., December
      case 'MMMM':
      default:
        return (
          match.month(dateString, { width: 'wide', context: 'formatting' }) ||
          match.month(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.month(dateString, { width: 'narrow', context: 'formatting' })
        )
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11
  }
  set(date, _flags, value) {
    date.setMonth(value, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
}
class StandAloneMonthParser extends Parser {
  priority = 110
  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback)
      // 01, 02, ..., 12
      case 'LL':
        return mapValue(parseNDigits(2, dateString), valueCallback)
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: 'month'
          }),
          valueCallback
        )
      // Jan, Feb, ..., Dec
      case 'LLL':
        return (
          match.month(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(dateString, { width: 'narrow', context: 'standalone' })
        )
      // J, F, ..., D
      case 'LLLLL':
        return match.month(dateString, {
          width: 'narrow',
          context: 'standalone'
        })
      // January, February, ..., December
      case 'LLLL':
      default:
        return (
          match.month(dateString, { width: 'wide', context: 'standalone' }) ||
          match.month(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) ||
          match.month(dateString, { width: 'narrow', context: 'standalone' })
        )
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11
  }
  set(date, _flags, value) {
    date.setMonth(value, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
}
function setWeek(date, week, options) {
  const _date = toDate$1(date)
  const diff = getWeek(_date, options) - week
  _date.setDate(_date.getDate() - diff * 7)
  return _date
}
class LocalWeekParser extends Parser {
  priority = 100
  parse(dateString, token, match) {
    switch (token) {
      case 'w':
        return parseNumericPattern(numericPatterns.week, dateString)
      case 'wo':
        return match.ordinalNumber(dateString, { unit: 'week' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options)
  }
  incompatibleTokens = ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
}
function setISOWeek(date, week) {
  const _date = toDate$1(date)
  const diff = getISOWeek(_date) - week
  _date.setDate(_date.getDate() - diff * 7)
  return _date
}
class ISOWeekParser extends Parser {
  priority = 100
  parse(dateString, token, match) {
    switch (token) {
      case 'I':
        return parseNumericPattern(numericPatterns.week, dateString)
      case 'Io':
        return match.ordinalNumber(dateString, { unit: 'week' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value))
  }
  incompatibleTokens = ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
}
const DAYS_IN_MONTH$1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const DAYS_IN_MONTH_LEAP_YEAR$1 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
class DateParser extends Parser {
  priority = 90
  subPriority = 1
  parse(dateString, token, match) {
    switch (token) {
      case 'd':
        return parseNumericPattern(numericPatterns.date, dateString)
      case 'do':
        return match.ordinalNumber(dateString, { unit: 'date' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(date, value) {
    const year = date.getFullYear()
    const isLeapYear = isLeapYearIndex$1(year)
    const month = date.getMonth()
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR$1[month]
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH$1[month]
    }
  }
  set(date, _flags, value) {
    date.setDate(value)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
}
class DayOfYearParser extends Parser {
  priority = 90
  subpriority = 1
  parse(dateString, token, match) {
    switch (token) {
      case 'D':
      case 'DD':
        return parseNumericPattern(numericPatterns.dayOfYear, dateString)
      case 'Do':
        return match.ordinalNumber(dateString, { unit: 'date' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(date, value) {
    const year = date.getFullYear()
    const isLeapYear = isLeapYearIndex$1(year)
    if (isLeapYear) {
      return value >= 1 && value <= 366
    } else {
      return value >= 1 && value <= 365
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']
}
function setDay(date, day, options) {
  const defaultOptions = getDefaultOptions$1()
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0
  const _date = toDate$1(date)
  const currentDay = _date.getDay()
  const remainder = day % 7
  const dayIndex = (remainder + 7) % 7
  const delta = 7 - weekStartsOn
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7)
  return addDays(_date, diff)
}
class DayParser extends Parser {
  priority = 90
  parse(dateString, token, match) {
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return (
          match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.day(dateString, { width: 'short', context: 'formatting' }) ||
          match.day(dateString, { width: 'narrow', context: 'formatting' })
        )
      // T
      case 'EEEEE':
        return match.day(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'EEEEEE':
        return (
          match.day(dateString, { width: 'short', context: 'formatting' }) ||
          match.day(dateString, { width: 'narrow', context: 'formatting' })
        )
      // Tuesday
      case 'EEEE':
      default:
        return (
          match.day(dateString, { width: 'wide', context: 'formatting' }) ||
          match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.day(dateString, { width: 'short', context: 'formatting' }) ||
          match.day(dateString, { width: 'narrow', context: 'formatting' })
        )
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['D', 'i', 'e', 'c', 't', 'T']
}
class LocalDayParser extends Parser {
  priority = 90
  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays
    }
    switch (token) {
      // 3
      case 'e':
      case 'ee':
        return mapValue(parseNDigits(token.length, dateString), valueCallback)
      // 3rd
      case 'eo':
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: 'day'
          }),
          valueCallback
        )
      // Tue
      case 'eee':
        return (
          match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.day(dateString, { width: 'short', context: 'formatting' }) ||
          match.day(dateString, { width: 'narrow', context: 'formatting' })
        )
      // T
      case 'eeeee':
        return match.day(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'eeeeee':
        return (
          match.day(dateString, { width: 'short', context: 'formatting' }) ||
          match.day(dateString, { width: 'narrow', context: 'formatting' })
        )
      // Tuesday
      case 'eeee':
      default:
        return (
          match.day(dateString, { width: 'wide', context: 'formatting' }) ||
          match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.day(dateString, { width: 'short', context: 'formatting' }) ||
          match.day(dateString, { width: 'narrow', context: 'formatting' })
        )
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']
}
class StandAloneLocalDayParser extends Parser {
  priority = 90
  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays
    }
    switch (token) {
      // 3
      case 'c':
      case 'cc':
        return mapValue(parseNDigits(token.length, dateString), valueCallback)
      // 3rd
      case 'co':
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: 'day'
          }),
          valueCallback
        )
      // Tue
      case 'ccc':
        return (
          match.day(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) ||
          match.day(dateString, { width: 'short', context: 'standalone' }) ||
          match.day(dateString, { width: 'narrow', context: 'standalone' })
        )
      // T
      case 'ccccc':
        return match.day(dateString, {
          width: 'narrow',
          context: 'standalone'
        })
      // Tu
      case 'cccccc':
        return (
          match.day(dateString, { width: 'short', context: 'standalone' }) ||
          match.day(dateString, { width: 'narrow', context: 'standalone' })
        )
      // Tuesday
      case 'cccc':
      default:
        return (
          match.day(dateString, { width: 'wide', context: 'standalone' }) ||
          match.day(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) ||
          match.day(dateString, { width: 'short', context: 'standalone' }) ||
          match.day(dateString, { width: 'narrow', context: 'standalone' })
        )
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']
}
function setISODay(date, day) {
  const _date = toDate$1(date)
  const currentDay = getISODay(_date)
  const diff = day - currentDay
  return addDays(_date, diff)
}
class ISODayParser extends Parser {
  priority = 90
  parse(dateString, token, match) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7
      }
      return value
    }
    switch (token) {
      // 2
      case 'i':
      case 'ii':
        return parseNDigits(token.length, dateString)
      // 2nd
      case 'io':
        return match.ordinalNumber(dateString, { unit: 'day' })
      // Tue
      case 'iii':
        return mapValue(
          match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
            match.day(dateString, {
              width: 'short',
              context: 'formatting'
            }) ||
            match.day(dateString, {
              width: 'narrow',
              context: 'formatting'
            }),
          valueCallback
        )
      // T
      case 'iiiii':
        return mapValue(
          match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          }),
          valueCallback
        )
      // Tu
      case 'iiiiii':
        return mapValue(
          match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) ||
            match.day(dateString, {
              width: 'narrow',
              context: 'formatting'
            }),
          valueCallback
        )
      // Tuesday
      case 'iiii':
      default:
        return mapValue(
          match.day(dateString, {
            width: 'wide',
            context: 'formatting'
          }) ||
            match.day(dateString, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.day(dateString, {
              width: 'short',
              context: 'formatting'
            }) ||
            match.day(dateString, {
              width: 'narrow',
              context: 'formatting'
            }),
          valueCallback
        )
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7
  }
  set(date, _flags, value) {
    date = setISODay(date, value)
    date.setHours(0, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']
}
class AMPMParser extends Parser {
  priority = 80
  parse(dateString, token, match) {
    switch (token) {
      case 'a':
      case 'aa':
      case 'aaa':
        return (
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
      case 'aaaaa':
        return match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'aaaa':
      default:
        return (
          match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0)
    return date
  }
  incompatibleTokens = ['b', 'B', 'H', 'k', 't', 'T']
}
class AMPMMidnightParser extends Parser {
  priority = 80
  parse(dateString, token, match) {
    switch (token) {
      case 'b':
      case 'bb':
      case 'bbb':
        return (
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
      case 'bbbbb':
        return match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'bbbb':
      default:
        return (
          match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0)
    return date
  }
  incompatibleTokens = ['a', 'B', 'H', 'k', 't', 'T']
}
class DayPeriodParser extends Parser {
  priority = 80
  parse(dateString, token, match) {
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return (
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
      case 'BBBBB':
        return match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'BBBB':
      default:
        return (
          match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          })
        )
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0)
    return date
  }
  incompatibleTokens = ['a', 'b', 't', 'T']
}
class Hour1to12Parser extends Parser {
  priority = 70
  parse(dateString, token, match) {
    switch (token) {
      case 'h':
        return parseNumericPattern(numericPatterns.hour12h, dateString)
      case 'ho':
        return match.ordinalNumber(dateString, { unit: 'hour' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0)
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0)
    } else {
      date.setHours(value, 0, 0, 0)
    }
    return date
  }
  incompatibleTokens = ['H', 'K', 'k', 't', 'T']
}
class Hour0to23Parser extends Parser {
  priority = 70
  parse(dateString, token, match) {
    switch (token) {
      case 'H':
        return parseNumericPattern(numericPatterns.hour23h, dateString)
      case 'Ho':
        return match.ordinalNumber(dateString, { unit: 'hour' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['a', 'b', 'h', 'K', 'k', 't', 'T']
}
class Hour0To11Parser extends Parser {
  priority = 70
  parse(dateString, token, match) {
    switch (token) {
      case 'K':
        return parseNumericPattern(numericPatterns.hour11h, dateString)
      case 'Ko':
        return match.ordinalNumber(dateString, { unit: 'hour' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0)
    } else {
      date.setHours(value, 0, 0, 0)
    }
    return date
  }
  incompatibleTokens = ['h', 'H', 'k', 't', 'T']
}
class Hour1To24Parser extends Parser {
  priority = 70
  parse(dateString, token, match) {
    switch (token) {
      case 'k':
        return parseNumericPattern(numericPatterns.hour24h, dateString)
      case 'ko':
        return match.ordinalNumber(dateString, { unit: 'hour' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value
    date.setHours(hours, 0, 0, 0)
    return date
  }
  incompatibleTokens = ['a', 'b', 'h', 'H', 'K', 't', 'T']
}
class MinuteParser extends Parser {
  priority = 60
  parse(dateString, token, match) {
    switch (token) {
      case 'm':
        return parseNumericPattern(numericPatterns.minute, dateString)
      case 'mo':
        return match.ordinalNumber(dateString, { unit: 'minute' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0)
    return date
  }
  incompatibleTokens = ['t', 'T']
}
class SecondParser extends Parser {
  priority = 50
  parse(dateString, token, match) {
    switch (token) {
      case 's':
        return parseNumericPattern(numericPatterns.second, dateString)
      case 'so':
        return match.ordinalNumber(dateString, { unit: 'second' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0)
    return date
  }
  incompatibleTokens = ['t', 'T']
}
class FractionOfSecondParser extends Parser {
  priority = 30
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3))
    return mapValue(parseNDigits(token.length, dateString), valueCallback)
  }
  set(date, _flags, value) {
    date.setMilliseconds(value)
    return date
  }
  incompatibleTokens = ['t', 'T']
}
class ISOTimezoneWithZParser extends Parser {
  priority = 10
  parse(dateString, token) {
    switch (token) {
      case 'X':
        return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString)
      case 'XX':
        return parseTimezonePattern(timezonePatterns.basic, dateString)
      case 'XXXX':
        return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString)
      case 'XXXXX':
        return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString)
      case 'XXX':
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString)
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date
    return constructFrom(date, date.getTime() - getTimezoneOffsetInMilliseconds$1(date) - value)
  }
  incompatibleTokens = ['t', 'T', 'x']
}
class ISOTimezoneParser extends Parser {
  priority = 10
  parse(dateString, token) {
    switch (token) {
      case 'x':
        return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString)
      case 'xx':
        return parseTimezonePattern(timezonePatterns.basic, dateString)
      case 'xxxx':
        return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString)
      case 'xxxxx':
        return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString)
      case 'xxx':
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString)
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date
    return constructFrom(date, date.getTime() - getTimezoneOffsetInMilliseconds$1(date) - value)
  }
  incompatibleTokens = ['t', 'T', 'X']
}
class TimestampSecondsParser extends Parser {
  priority = 40
  parse(dateString) {
    return parseAnyDigitsSigned(dateString)
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }]
  }
  incompatibleTokens = '*'
}
class TimestampMillisecondsParser extends Parser {
  priority = 20
  parse(dateString) {
    return parseAnyDigitsSigned(dateString)
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }]
  }
  incompatibleTokens = '*'
}
const parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
}
const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g
const escapedStringRegExp = /^'([^]*?)'?$/
const doubleQuoteRegExp = /''/g
const notWhitespaceRegExp = /\S/
const unescapedLatinCharacterRegExp = /[a-zA-Z]/
function parse(dateStr, formatStr, referenceDate, options) {
  const defaultOptions = getDefaultOptions()
  const locale = options?.locale ?? defaultOptions.locale ?? enUS
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0
  if (formatStr === '') {
    if (dateStr === '') {
      return toDate$1(referenceDate)
    } else {
      return constructFrom(referenceDate, NaN)
    }
  }
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  }
  const setters = [new DateToSystemTimezoneSetter()]
  const tokens = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0]
      if (firstCharacter in longFormatters) {
        const longFormatter = longFormatters[firstCharacter]
        return longFormatter(substring, locale.formatLong)
      }
      return substring
    })
    .join('')
    .match(formattingTokensRegExp)
  const usedTokens = []
  for (let token of tokens) {
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr)
    }
    if (!options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr)
    }
    const firstCharacter = token[0]
    const parser = parsers[firstCharacter]
    if (parser) {
      const { incompatibleTokens } = parser
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) =>
            incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        )
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          )
        }
      } else if (parser.incompatibleTokens === '*' && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        )
      }
      usedTokens.push({ token: firstCharacter, fullToken: token })
      const parseResult = parser.run(dateStr, token, locale.match, subFnOptions)
      if (!parseResult) {
        return constructFrom(referenceDate, NaN)
      }
      setters.push(parseResult.setter)
      dateStr = parseResult.rest
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          'Format string contains an unescaped latin alphabet character `' + firstCharacter + '`'
        )
      }
      if (token === "''") {
        token = "'"
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token)
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length)
      } else {
        return constructFrom(referenceDate, NaN)
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return constructFrom(referenceDate, NaN)
  }
  const uniquePrioritySetters = setters
    .map((setter) => setter.priority)
    .sort((a, b) => b - a)
    .filter((priority, index, array) => array.indexOf(priority) === index)
    .map((priority) =>
      setters
        .filter((setter) => setter.priority === priority)
        .sort((a, b) => b.subPriority - a.subPriority)
    )
    .map((setterArray) => setterArray[0])
  let date = toDate$1(referenceDate)
  if (isNaN(date.getTime())) {
    return constructFrom(referenceDate, NaN)
  }
  const flags = {}
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return constructFrom(referenceDate, NaN)
    }
    const result = setter.set(date, flags, subFnOptions)
    if (Array.isArray(result)) {
      date = result[0]
      Object.assign(flags, result[1])
    } else {
      date = result
    }
  }
  return constructFrom(referenceDate, date)
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'")
}
function startOfHour(date) {
  const _date = toDate$1(date)
  _date.setMinutes(0, 0, 0)
  return _date
}
function isSameMonth(dateLeft, dateRight) {
  const _dateLeft = toDate$1(dateLeft)
  const _dateRight = toDate$1(dateRight)
  return (
    _dateLeft.getFullYear() === _dateRight.getFullYear() &&
    _dateLeft.getMonth() === _dateRight.getMonth()
  )
}
function isSameQuarter(dateLeft, dateRight) {
  const dateLeftStartOfQuarter = startOfQuarter(dateLeft)
  const dateRightStartOfQuarter = startOfQuarter(dateRight)
  return +dateLeftStartOfQuarter === +dateRightStartOfQuarter
}
function startOfSecond(date) {
  const _date = toDate$1(date)
  _date.setMilliseconds(0)
  return _date
}
function isSameYear(dateLeft, dateRight) {
  const _dateLeft = toDate$1(dateLeft)
  const _dateRight = toDate$1(dateRight)
  return _dateLeft.getFullYear() === _dateRight.getFullYear()
}
function setMonth(date, month) {
  const _date = toDate$1(date)
  const year = _date.getFullYear()
  const day = _date.getDate()
  const dateWithDesiredMonth = constructFrom(date, 0)
  dateWithDesiredMonth.setFullYear(year, month, 15)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  _date.setMonth(month, Math.min(day, daysInMonth))
  return _date
}
function set(date, values) {
  let _date = toDate$1(date)
  if (isNaN(+_date)) {
    return constructFrom(date, NaN)
  }
  if (values.year != null) {
    _date.setFullYear(values.year)
  }
  if (values.month != null) {
    _date = setMonth(_date, values.month)
  }
  if (values.date != null) {
    _date.setDate(values.date)
  }
  if (values.hours != null) {
    _date.setHours(values.hours)
  }
  if (values.minutes != null) {
    _date.setMinutes(values.minutes)
  }
  if (values.seconds != null) {
    _date.setSeconds(values.seconds)
  }
  if (values.milliseconds != null) {
    _date.setMilliseconds(values.milliseconds)
  }
  return _date
}
function setHours(date, hours) {
  const _date = toDate$1(date)
  _date.setHours(hours)
  return _date
}
function setMinutes(date, minutes) {
  const _date = toDate$1(date)
  _date.setMinutes(minutes)
  return _date
}
function setQuarter(date, quarter) {
  const _date = toDate$1(date)
  const oldQuarter = Math.trunc(_date.getMonth() / 3) + 1
  const diff = quarter - oldQuarter
  return setMonth(_date, _date.getMonth() + diff * 3)
}
function setSeconds(date, seconds) {
  const _date = toDate$1(date)
  _date.setSeconds(seconds)
  return _date
}
function setYear(date, year) {
  const _date = toDate$1(date)
  if (isNaN(+_date)) {
    return constructFrom(date, NaN)
  }
  _date.setFullYear(year)
  return _date
}
const matcherMap = {
  date: isSameDay,
  month: isSameMonth,
  year: isSameYear,
  quarter: isSameQuarter
}
function makeWeekMatcher(firstDayOfWeek) {
  return (sourceTime, patternTime) => {
    const weekStartsOn = (firstDayOfWeek + 1) % 7
    return isSameWeek(sourceTime, patternTime, {
      weekStartsOn
    })
  }
}
function matchDate(sourceTime, patternTime, type, firstDayOfWeek = 0) {
  const matcher = type === 'week' ? makeWeekMatcher(firstDayOfWeek) : matcherMap[type]
  return matcher(sourceTime, patternTime)
}
function dateOrWeekItem(time2, monthTs, valueTs, currentTs, mode, firstDayOfWeek) {
  if (mode === 'date') {
    return dateItem(time2, monthTs, valueTs, currentTs)
  } else {
    return weekItem(time2, monthTs, valueTs, currentTs, firstDayOfWeek)
  }
}
function dateItem(time2, monthTs, valueTs, currentTs) {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time2 && time2 < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time2, 'date')) startOfSpan = true
    if (matchDate(valueTs[1], time2, 'date')) endOfSpan = true
  }
  const selected =
    valueTs !== null &&
    (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time2, 'date') || matchDate(valueTs[1], time2, 'date')
      : matchDate(valueTs, time2, 'date'))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time2),
      month: getMonth(time2),
      year: getYear(time2)
    },
    inCurrentMonth: isSameMonth(time2, monthTs),
    isCurrentDate: matchDate(currentTs, time2, 'date'),
    inSpan,
    inSelectedWeek: false,
    startOfSpan,
    endOfSpan,
    selected,
    ts: getTime(time2)
  }
}
function getMonthString(month, monthFormat, locale) {
  const date = new Date(2e3, month, 1).getTime()
  return format$1(date, monthFormat, {
    locale
  })
}
function getYearString(year, yearFormat, locale) {
  const date = new Date(year, 1, 1).getTime()
  return format$1(date, yearFormat, {
    locale
  })
}
function getQuarterString(quarter, quarterFormat, locale) {
  const date = new Date(2e3, quarter * 3 - 2, 1).getTime()
  return format$1(date, quarterFormat, {
    locale
  })
}
function weekItem(time2, monthTs, valueTs, currentTs, firstDayOfWeek) {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time2 && time2 < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time2, 'week', firstDayOfWeek)) startOfSpan = true
    if (matchDate(valueTs[1], time2, 'week', firstDayOfWeek)) endOfSpan = true
  }
  const inSelectedWeek =
    valueTs !== null &&
    (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time2, 'week', firstDayOfWeek) ||
        matchDate(valueTs[1], time2, 'week', firstDayOfWeek)
      : matchDate(valueTs, time2, 'week', firstDayOfWeek))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time2),
      month: getMonth(time2),
      year: getYear(time2)
    },
    inCurrentMonth: isSameMonth(time2, monthTs),
    isCurrentDate: matchDate(currentTs, time2, 'date'),
    inSpan,
    startOfSpan,
    endOfSpan,
    selected: false,
    inSelectedWeek,
    ts: getTime(time2)
  }
}
function monthItem(monthTs, valueTs, currentTs, { monthFormat }) {
  return {
    type: 'month',
    monthFormat,
    dateObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    isCurrent: isSameMonth(currentTs, monthTs),
    selected: valueTs !== null && matchDate(valueTs, monthTs, 'month'),
    ts: getTime(monthTs)
  }
}
function yearItem(yearTs, valueTs, currentTs, { yearFormat }) {
  return {
    type: 'year',
    yearFormat,
    dateObject: {
      year: getYear(yearTs)
    },
    isCurrent: isSameYear(currentTs, yearTs),
    selected: valueTs !== null && matchDate(valueTs, yearTs, 'year'),
    ts: getTime(yearTs)
  }
}
function quarterItem(quarterTs, valueTs, currentTs, { quarterFormat }) {
  return {
    type: 'quarter',
    quarterFormat,
    dateObject: {
      quarter: getQuarter(quarterTs),
      year: getYear(quarterTs)
    },
    isCurrent: isSameQuarter(currentTs, quarterTs),
    selected: valueTs !== null && matchDate(valueTs, quarterTs, 'quarter'),
    ts: getTime(quarterTs)
  }
}
function dateArray(monthTs, valueTs, currentTs, startDay, strip = false, weekMode = false) {
  const granularity = weekMode ? 'week' : 'date'
  const displayMonth = getMonth(monthTs)
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays = []
  let protectLastMonthDateIsShownFlag = !strip
  while (getDay(lastMonthIterator) !== startDay || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(
      dateOrWeekItem(lastMonthIterator, monthTs, valueTs, currentTs, granularity, startDay)
    )
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(
      dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay)
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  const endIndex = strip
    ? calendarDays.length <= 28
      ? 28
      : calendarDays.length <= 35
        ? 35
        : 42
    : 42
  while (calendarDays.length < endIndex) {
    calendarDays.push(
      dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay)
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  return calendarDays
}
function monthArray(yearAnchorTs, valueTs, currentTs, format2) {
  const calendarMonths = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 12; i++) {
    calendarMonths.push(monthItem(getTime(addMonths(yearStart, i)), valueTs, currentTs, format2))
  }
  return calendarMonths
}
function quarterArray(yearAnchorTs, valueTs, currentTs, format2) {
  const calendarQuarters = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 4; i++) {
    calendarQuarters.push(
      quarterItem(getTime(addQuarters(yearStart, i)), valueTs, currentTs, format2)
    )
  }
  return calendarQuarters
}
function yearArray(valueTs, currentTs, format2, rangeRef) {
  const range = rangeRef.value
  const calendarYears = []
  const startTime = startOfYear(setYear(/* @__PURE__ */ new Date(), range[0]))
  for (let i = 0; i < range[1] - range[0]; i++) {
    calendarYears.push(yearItem(getTime(addYears(startTime, i)), valueTs, currentTs, format2))
  }
  return calendarYears
}
function strictParse(string, pattern, backup, option) {
  const result = parse(string, pattern, backup, option)
  if (!isValid(result)) return result
  else if (format$1(result, pattern, option) === string) return result
  else return new Date(Number.NaN)
}
function getDefaultTime(timeValue) {
  if (timeValue === void 0) {
    return void 0
  }
  if (typeof timeValue === 'number') {
    return timeValue
  }
  const [hour, minute, second] = timeValue.split(':')
  return {
    hours: Number(hour),
    minutes: Number(minute),
    seconds: Number(second)
  }
}
function pluckValueFromRange(value, type) {
  return Array.isArray(value) ? value[type === 'start' ? 0 : 1] : null
}
const datePickerInjectionKey = createInjectionKey('n-date-picker')
const MONTH_ITEM_HEIGHT = 40
const TIME_FORMAT = 'HH:mm:ss'
const usePanelCommonProps = {
  active: Boolean,
  dateFormat: String,
  calendarDayFormat: String,
  calendarHeaderYearFormat: String,
  calendarHeaderMonthFormat: String,
  calendarHeaderMonthYearSeparator: {
    type: String,
    required: true
  },
  calendarHeaderMonthBeforeYear: {
    type: Boolean,
    default: void 0
  },
  timePickerFormat: {
    type: String,
    value: TIME_FORMAT
  },
  value: {
    type: [Array, Number],
    default: null
  },
  shortcuts: Object,
  defaultTime: [Number, String, Array],
  inputReadonly: Boolean,
  onClear: Function,
  onConfirm: Function,
  onClose: Function,
  onTabOut: Function,
  onKeydown: Function,
  actions: Array,
  onUpdateValue: {
    type: Function,
    required: true
  },
  themeClass: String,
  onRender: Function,
  panel: Boolean,
  onNextMonth: Function,
  onPrevMonth: Function,
  onNextYear: Function,
  onPrevYear: Function
}
function usePanelCommon(props) {
  const {
    dateLocaleRef,
    timePickerSizeRef,
    timePickerPropsRef,
    localeRef,
    mergedClsPrefixRef,
    mergedThemeRef
  } = inject(datePickerInjectionKey)
  const dateFnsOptionsRef = computed(() => {
    return {
      locale: dateLocaleRef.value.locale
    }
  })
  const selfRef = ref(null)
  const keyboardState = useKeyboard()
  function doClear() {
    const { onClear } = props
    if (onClear) onClear()
  }
  function doConfirm() {
    const { onConfirm, value } = props
    if (onConfirm) onConfirm(value)
  }
  function doUpdateValue(value, doUpdate) {
    const { onUpdateValue } = props
    onUpdateValue(value, doUpdate)
  }
  function doClose(disableUpdateOnClose = false) {
    const { onClose } = props
    if (onClose) onClose(disableUpdateOnClose)
  }
  function doTabOut() {
    const { onTabOut } = props
    if (onTabOut) onTabOut()
  }
  function handleClearClick() {
    doUpdateValue(null, true)
    doClose(true)
    doClear()
  }
  function handleFocusDetectorFocus() {
    doTabOut()
  }
  function disableTransitionOneTick() {
    if (props.active || props.panel) {
      void nextTick(() => {
        const { value: selfEl } = selfRef
        if (!selfEl) return
        const dateEls = selfEl.querySelectorAll('[data-n-date]')
        dateEls.forEach((el) => {
          el.classList.add('transition-disabled')
        })
        void selfEl.offsetWidth
        dateEls.forEach((el) => {
          el.classList.remove('transition-disabled')
        })
      })
    }
  }
  function handlePanelKeyDown(e) {
    if (e.key === 'Tab' && e.target === selfRef.value && keyboardState.shift) {
      e.preventDefault()
      doTabOut()
    }
  }
  function handlePanelFocus(e) {
    const { value: el } = selfRef
    if (
      keyboardState.tab &&
      e.target === el &&
      (el === null || el === void 0 ? void 0 : el.contains(e.relatedTarget))
    ) {
      doTabOut()
    }
  }
  let cachedValue = null
  let cached = false
  function cachePendingValue() {
    cachedValue = props.value
    cached = true
  }
  function clearPendingValue() {
    cached = false
  }
  function restorePendingValue() {
    if (cached) {
      doUpdateValue(cachedValue, false)
      cached = false
    }
  }
  function getShortcutValue(shortcut) {
    if (typeof shortcut === 'function') {
      return shortcut()
    }
    return shortcut
  }
  const showMonthYearPanel = ref(false)
  function handleOpenQuickSelectMonthPanel() {
    showMonthYearPanel.value = !showMonthYearPanel.value
  }
  return {
    mergedTheme: mergedThemeRef,
    mergedClsPrefix: mergedClsPrefixRef,
    dateFnsOptions: dateFnsOptionsRef,
    timePickerSize: timePickerSizeRef,
    timePickerProps: timePickerPropsRef,
    selfRef,
    locale: localeRef,
    doConfirm,
    doClose,
    doUpdateValue,
    doTabOut,
    handleClearClick,
    handleFocusDetectorFocus,
    disableTransitionOneTick,
    handlePanelKeyDown,
    handlePanelFocus,
    cachePendingValue,
    clearPendingValue,
    restorePendingValue,
    getShortcutValue,
    handleShortcutMouseleave: restorePendingValue,
    showMonthYearPanel,
    handleOpenQuickSelectMonthPanel
  }
}
const useCalendarProps = Object.assign(Object.assign({}, usePanelCommonProps), {
  defaultCalendarStartTime: Number,
  actions: {
    type: Array,
    default: () => ['now', 'clear', 'confirm']
  }
})
function useCalendar(props, type) {
  var _a
  const panelCommon = usePanelCommon(props)
  const {
    isValueInvalidRef,
    isDateDisabledRef,
    isDateInvalidRef,
    isTimeInvalidRef,
    isDateTimeInvalidRef,
    isHourDisabledRef,
    isMinuteDisabledRef,
    isSecondDisabledRef,
    localeRef,
    firstDayOfWeekRef,
    datePickerSlots,
    yearFormatRef,
    monthFormatRef,
    quarterFormatRef,
    yearRangeRef
  } = inject(datePickerInjectionKey)
  const validation = {
    isValueInvalid: isValueInvalidRef,
    isDateDisabled: isDateDisabledRef,
    isDateInvalid: isDateInvalidRef,
    isTimeInvalid: isTimeInvalidRef,
    isDateTimeInvalid: isDateTimeInvalidRef,
    isHourDisabled: isHourDisabledRef,
    isMinuteDisabled: isMinuteDisabledRef,
    isSecondDisabled: isSecondDisabledRef
  }
  const mergedDateFormatRef = computed(() => props.dateFormat || localeRef.value.dateFormat)
  const mergedDayFormatRef = computed(() => props.calendarDayFormat || localeRef.value.dayFormat)
  const dateInputValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? ''
      : format$1(props.value, mergedDateFormatRef.value)
  )
  const calendarValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? (_a = props.defaultCalendarStartTime) !== null && _a !== void 0
        ? _a
        : Date.now()
      : props.value
  )
  const yearVlRef = ref(null)
  const yearScrollbarRef = ref(null)
  const monthScrollbarRef = ref(null)
  const nowRef = ref(Date.now())
  const dateArrayRef = computed(() => {
    var _a2
    return dateArray(
      calendarValueRef.value,
      props.value,
      nowRef.value,
      (_a2 = firstDayOfWeekRef.value) !== null && _a2 !== void 0
        ? _a2
        : localeRef.value.firstDayOfWeek,
      false,
      type === 'week'
    )
  })
  const monthArrayRef = computed(() => {
    const { value } = props
    return monthArray(calendarValueRef.value, Array.isArray(value) ? null : value, nowRef.value, {
      monthFormat: monthFormatRef.value
    })
  })
  const yearArrayRef = computed(() => {
    const { value } = props
    return yearArray(
      Array.isArray(value) ? null : value,
      nowRef.value,
      {
        yearFormat: yearFormatRef.value
      },
      yearRangeRef
    )
  })
  const quarterArrayRef = computed(() => {
    const { value } = props
    return quarterArray(calendarValueRef.value, Array.isArray(value) ? null : value, nowRef.value, {
      quarterFormat: quarterFormatRef.value
    })
  })
  const weekdaysRef = computed(() => {
    return dateArrayRef.value.slice(0, 7).map((dateItem2) => {
      const { ts } = dateItem2
      return format$1(ts, mergedDayFormatRef.value, panelCommon.dateFnsOptions.value)
    })
  })
  const calendarMonthRef = computed(() => {
    return format$1(
      calendarValueRef.value,
      props.calendarHeaderMonthFormat || localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const calendarYearRef = computed(() => {
    return format$1(
      calendarValueRef.value,
      props.calendarHeaderYearFormat || localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const calendarMonthBeforeYearRef = computed(() => {
    var _a2
    return (_a2 = props.calendarHeaderMonthBeforeYear) !== null && _a2 !== void 0
      ? _a2
      : localeRef.value.monthBeforeYear
  })
  watch(calendarValueRef, (value, oldValue) => {
    if (type === 'date' || type === 'datetime') {
      if (!isSameMonth(value, oldValue)) {
        panelCommon.disableTransitionOneTick()
      }
    }
  })
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && !Array.isArray(value)) {
        dateInputValueRef.value = format$1(
          value,
          mergedDateFormatRef.value,
          panelCommon.dateFnsOptions.value
        )
        calendarValueRef.value = value
      } else {
        dateInputValueRef.value = ''
      }
    }
  )
  function sanitizeValue(value) {
    var _a2
    if (type === 'datetime') return getTime(startOfSecond(value))
    if (type === 'month') return getTime(startOfMonth(value))
    if (type === 'year') return getTime(startOfYear(value))
    if (type === 'quarter') return getTime(startOfQuarter(value))
    if (type === 'week') {
      const weekStartsOn =
        (((_a2 = firstDayOfWeekRef.value) !== null && _a2 !== void 0
          ? _a2
          : localeRef.value.firstDayOfWeek) +
          1) %
        7
      return getTime(
        startOfWeek(value, {
          weekStartsOn
        })
      )
    }
    return getTime(startOfDay(value))
  }
  function mergedIsDateDisabled(ts, detail2) {
    const {
      isDateDisabled: { value: isDateDisabled }
    } = validation
    if (!isDateDisabled) return false
    return isDateDisabled(ts, detail2)
  }
  function handleDateInput(value) {
    const date = strictParse(
      value,
      mergedDateFormatRef.value,
      /* @__PURE__ */ new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), props.panel)
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(getTime(sanitizeValue(getTime(newDateTime))), props.panel)
      }
    } else {
      dateInputValueRef.value = value
    }
  }
  function handleDateInputBlur() {
    const date = strictParse(
      dateInputValueRef.value,
      mergedDateFormatRef.value,
      /* @__PURE__ */ new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), false)
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(getTime(sanitizeValue(getTime(newDateTime))), false)
      }
    } else {
      deriveDateInputValue()
    }
  }
  function clearSelectedDateTime() {
    panelCommon.doUpdateValue(null, true)
    dateInputValueRef.value = ''
    panelCommon.doClose(true)
    panelCommon.handleClearClick()
  }
  function handleNowClick() {
    panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), true)
    const now = Date.now()
    calendarValueRef.value = now
    panelCommon.doClose(true)
    if (props.panel && (type === 'month' || type === 'quarter' || type === 'year')) {
      panelCommon.disableTransitionOneTick()
      justifyColumnsScrollState(now)
    }
  }
  const hoveredWeekRef = ref(null)
  function handleDateMouseEnter(dateItem2) {
    if (dateItem2.type === 'date' && type === 'week') {
      hoveredWeekRef.value = sanitizeValue(getTime(dateItem2.ts))
    }
  }
  function isWeekHovered(dateItem2) {
    if (dateItem2.type === 'date' && type === 'week') {
      return sanitizeValue(getTime(dateItem2.ts)) === hoveredWeekRef.value
    }
    return false
  }
  function handleDateClick(dateItem2) {
    if (
      mergedIsDateDisabled(
        dateItem2.ts,
        dateItem2.type === 'date'
          ? {
              type: 'date',
              year: dateItem2.dateObject.year,
              month: dateItem2.dateObject.month,
              date: dateItem2.dateObject.date
            }
          : dateItem2.type === 'month'
            ? {
                type: 'month',
                year: dateItem2.dateObject.year,
                month: dateItem2.dateObject.month
              }
            : dateItem2.type === 'year'
              ? {
                  type: 'year',
                  year: dateItem2.dateObject.year
                }
              : {
                  type: 'quarter',
                  year: dateItem2.dateObject.year,
                  quarter: dateItem2.dateObject.quarter
                }
      )
    ) {
      return
    }
    let newValue
    if (props.value !== null && !Array.isArray(props.value)) {
      newValue = props.value
    } else {
      newValue = Date.now()
    }
    if (type === 'datetime' && props.defaultTime !== null && !Array.isArray(props.defaultTime)) {
      const time2 = getDefaultTime(props.defaultTime)
      if (time2) {
        newValue = getTime(set(newValue, time2))
      }
    }
    newValue = getTime(
      dateItem2.type === 'quarter' && dateItem2.dateObject.quarter
        ? setQuarter(setYear(newValue, dateItem2.dateObject.year), dateItem2.dateObject.quarter)
        : set(newValue, dateItem2.dateObject)
    )
    panelCommon.doUpdateValue(
      sanitizeValue(newValue),
      props.panel || type === 'date' || type === 'week' || type === 'year'
    )
    switch (type) {
      case 'date':
      case 'week':
        panelCommon.doClose()
        break
      case 'year':
        if (props.panel) {
          panelCommon.disableTransitionOneTick()
        }
        panelCommon.doClose()
        break
      case 'month':
        panelCommon.disableTransitionOneTick()
        justifyColumnsScrollState(newValue)
        break
      case 'quarter':
        panelCommon.disableTransitionOneTick()
        justifyColumnsScrollState(newValue)
        break
    }
  }
  function handleQuickMonthClick(dateItem2, updatePanelValue) {
    let newValue
    if (props.value !== null && !Array.isArray(props.value)) {
      newValue = props.value
    } else {
      newValue = Date.now()
    }
    newValue = getTime(
      dateItem2.type === 'month'
        ? setMonth(newValue, dateItem2.dateObject.month)
        : setYear(newValue, dateItem2.dateObject.year)
    )
    updatePanelValue(newValue)
    justifyColumnsScrollState(newValue)
  }
  function onUpdateCalendarValue(value) {
    calendarValueRef.value = value
  }
  function deriveDateInputValue(time2) {
    if (props.value === null || Array.isArray(props.value)) {
      dateInputValueRef.value = ''
      return
    }
    if (time2 === void 0) {
      time2 = props.value
    }
    dateInputValueRef.value = format$1(
      time2,
      mergedDateFormatRef.value,
      panelCommon.dateFnsOptions.value
    )
  }
  function handleConfirmClick() {
    if (validation.isDateInvalid.value || validation.isTimeInvalid.value) {
      return
    }
    panelCommon.doConfirm()
    closeCalendar()
  }
  function closeCalendar() {
    if (props.active) {
      panelCommon.doClose()
    }
  }
  function nextYear() {
    var _a2
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, 1))
    ;(_a2 = props.onNextYear) === null || _a2 === void 0 ? void 0 : _a2.call(props)
  }
  function prevYear() {
    var _a2
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, -1))
    ;(_a2 = props.onPrevYear) === null || _a2 === void 0 ? void 0 : _a2.call(props)
  }
  function nextMonth() {
    var _a2
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, 1))
    ;(_a2 = props.onNextMonth) === null || _a2 === void 0 ? void 0 : _a2.call(props)
  }
  function prevMonth() {
    var _a2
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, -1))
    ;(_a2 = props.onPrevMonth) === null || _a2 === void 0 ? void 0 : _a2.call(props)
  }
  function virtualListContainer() {
    const { value } = yearVlRef
    return (value === null || value === void 0 ? void 0 : value.listElRef) || null
  }
  function virtualListContent() {
    const { value } = yearVlRef
    return (value === null || value === void 0 ? void 0 : value.itemsElRef) || null
  }
  function handleVirtualListScroll() {
    var _a2
    ;(_a2 = yearScrollbarRef.value) === null || _a2 === void 0 ? void 0 : _a2.sync()
  }
  function handleTimePickerChange(value) {
    if (value === null) return
    panelCommon.doUpdateValue(value, props.panel)
  }
  function handleSingleShortcutMouseenter(shortcut) {
    panelCommon.cachePendingValue()
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (typeof shortcutValue !== 'number') return
    panelCommon.doUpdateValue(shortcutValue, false)
  }
  function handleSingleShortcutClick(shortcut) {
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (typeof shortcutValue !== 'number') return
    panelCommon.doUpdateValue(shortcutValue, props.panel)
    panelCommon.clearPendingValue()
    handleConfirmClick()
  }
  function justifyColumnsScrollState(value) {
    const { value: mergedValue } = props
    if (monthScrollbarRef.value) {
      const monthIndex =
        value === void 0
          ? mergedValue === null
            ? getMonth(Date.now())
            : getMonth(mergedValue)
          : getMonth(value)
      monthScrollbarRef.value.scrollTo({
        top: monthIndex * MONTH_ITEM_HEIGHT
      })
    }
    if (yearVlRef.value) {
      const yearIndex =
        (value === void 0
          ? mergedValue === null
            ? getYear(Date.now())
            : getYear(mergedValue)
          : getYear(value)) - yearRangeRef.value[0]
      yearVlRef.value.scrollTo({
        top: yearIndex * MONTH_ITEM_HEIGHT
      })
    }
  }
  const childComponentRefs = {
    monthScrollbarRef,
    yearScrollbarRef,
    yearVlRef
  }
  return Object.assign(
    Object.assign(
      Object.assign(
        Object.assign(
          {
            dateArray: dateArrayRef,
            monthArray: monthArrayRef,
            yearArray: yearArrayRef,
            quarterArray: quarterArrayRef,
            calendarYear: calendarYearRef,
            calendarMonth: calendarMonthRef,
            weekdays: weekdaysRef,
            calendarMonthBeforeYear: calendarMonthBeforeYearRef,
            mergedIsDateDisabled,
            nextYear,
            prevYear,
            nextMonth,
            prevMonth,
            handleNowClick,
            handleConfirmClick,
            handleSingleShortcutMouseenter,
            handleSingleShortcutClick
          },
          validation
        ),
        panelCommon
      ),
      childComponentRefs
    ),
    {
      // datetime only
      handleDateClick,
      handleDateInputBlur,
      handleDateInput,
      handleDateMouseEnter,
      isWeekHovered,
      handleTimePickerChange,
      clearSelectedDateTime,
      virtualListContainer,
      virtualListContent,
      handleVirtualListScroll,
      timePickerSize: panelCommon.timePickerSize,
      dateInputValue: dateInputValueRef,
      datePickerSlots,
      handleQuickMonthClick,
      justifyColumnsScrollState,
      calendarValue: calendarValueRef,
      onUpdateCalendarValue
    }
  )
}
const MonthPanel = defineComponent({
  name: 'MonthPanel',
  props: Object.assign(Object.assign({}, useCalendarProps), {
    type: {
      type: String,
      required: true
    },
    // panelHeader prop
    useAsQuickJump: Boolean
  }),
  setup(props) {
    const useCalendarRef = useCalendar(props, props.type)
    const { dateLocaleRef } = useLocale('DatePicker')
    const getRenderContent = (item) => {
      switch (item.type) {
        case 'year':
          return getYearString(item.dateObject.year, item.yearFormat, dateLocaleRef.value.locale)
        case 'month':
          return getMonthString(item.dateObject.month, item.monthFormat, dateLocaleRef.value.locale)
        case 'quarter':
          return getQuarterString(
            item.dateObject.quarter,
            item.quarterFormat,
            dateLocaleRef.value.locale
          )
      }
    }
    const { useAsQuickJump } = props
    const renderItem = (item, i, mergedClsPrefix) => {
      const { mergedIsDateDisabled, handleDateClick, handleQuickMonthClick } = useCalendarRef
      return h(
        'div',
        {
          'data-n-date': true,
          key: i,
          class: [
            `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
            item.isCurrent &&
              `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`,
            item.selected &&
              `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`,
            !useAsQuickJump &&
              mergedIsDateDisabled(
                item.ts,
                item.type === 'year'
                  ? {
                      type: 'year',
                      year: item.dateObject.year
                    }
                  : item.type === 'month'
                    ? {
                        type: 'month',
                        year: item.dateObject.year,
                        month: item.dateObject.month
                      }
                    : item.type === 'quarter'
                      ? {
                          type: 'month',
                          year: item.dateObject.year,
                          month: item.dateObject.quarter
                        }
                      : null
              ) &&
              `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--disabled`
          ],
          onClick: () => {
            if (useAsQuickJump) {
              handleQuickMonthClick(item, (value) => {
                props.onUpdateValue(value, false)
              })
            } else {
              handleDateClick(item)
            }
          }
        },
        getRenderContent(item)
      )
    }
    onMounted(() => {
      useCalendarRef.justifyColumnsScrollState()
    })
    return Object.assign(Object.assign({}, useCalendarRef), {
      renderItem
    })
  },
  render() {
    const { mergedClsPrefix, mergedTheme, shortcuts, actions, renderItem, type, onRender } = this
    onRender === null || onRender === void 0 ? void 0 : onRender()
    return h(
      'div',
      {
        ref: 'selfRef',
        tabindex: 0,
        class: [
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--month`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ],
        onFocus: this.handlePanelFocus,
        onKeydown: this.handlePanelKeyDown
      },
      h(
        'div',
        {
          class: `${mergedClsPrefix}-date-panel-month-calendar`
        },
        h(
          Scrollbar,
          {
            ref: 'yearScrollbarRef',
            class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`,
            theme: mergedTheme.peers.Scrollbar,
            themeOverrides: mergedTheme.peerOverrides.Scrollbar,
            container: this.virtualListContainer,
            content: this.virtualListContent,
            horizontalRailStyle: {
              zIndex: 1
            },
            verticalRailStyle: {
              zIndex: 1
            }
          },
          {
            default: () =>
              h(
                VVirtualList,
                {
                  ref: 'yearVlRef',
                  items: this.yearArray,
                  itemSize: MONTH_ITEM_HEIGHT,
                  showScrollbar: false,
                  keyField: 'ts',
                  onScroll: this.handleVirtualListScroll,
                  paddingBottom: 4
                },
                {
                  default: ({ item, index }) => {
                    return renderItem(item, index, mergedClsPrefix)
                  }
                }
              )
          }
        ),
        type === 'month' || type === 'quarter'
          ? h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`
              },
              h(
                Scrollbar,
                {
                  ref: 'monthScrollbarRef',
                  theme: mergedTheme.peers.Scrollbar,
                  themeOverrides: mergedTheme.peerOverrides.Scrollbar
                },
                {
                  default: () => [
                    (type === 'month' ? this.monthArray : this.quarterArray).map((item, i) =>
                      renderItem(item, i, mergedClsPrefix)
                    ),
                    h('div', {
                      class: `${mergedClsPrefix}-date-panel-${type}-calendar__padding`
                    })
                  ]
                }
              )
            )
          : null
      ),
      resolveWrappedSlot(this.datePickerSlots.footer, (children) => {
        return children
          ? h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-footer`
              },
              children
            )
          : null
      }),
      (actions === null || actions === void 0 ? void 0 : actions.length) || shortcuts
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-actions`
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__prefix`
              },
              shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut)
                    ? null
                    : h(
                        XButton,
                        {
                          size: 'tiny',
                          onMouseenter: () => {
                            this.handleSingleShortcutMouseenter(shortcut)
                          },
                          onClick: () => {
                            this.handleSingleShortcutClick(shortcut)
                          },
                          onMouseleave: () => {
                            this.handleShortcutMouseleave()
                          }
                        },
                        {
                          default: () => key
                        }
                      )
                })
            ),
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__suffix`
              },
              (actions === null || actions === void 0 ? void 0 : actions.includes('clear'))
                ? resolveSlotWithTypedProps(
                    this.datePickerSlots.clear,
                    {
                      onClear: this.handleClearClick,
                      text: this.locale.clear
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleClearClick
                        },
                        {
                          default: () => this.locale.clear
                        }
                      )
                    ]
                  )
                : null,
              (actions === null || actions === void 0 ? void 0 : actions.includes('now'))
                ? resolveSlotWithTypedProps(
                    this.datePickerSlots.now,
                    {
                      onNow: this.handleNowClick,
                      text: this.locale.now
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleNowClick
                        },
                        {
                          default: () => this.locale.now
                        }
                      )
                    ]
                  )
                : null,
              (actions === null || actions === void 0 ? void 0 : actions.includes('confirm'))
                ? resolveSlotWithTypedProps(
                    this.datePickerSlots.confirm,
                    {
                      onConfirm: this.handleConfirmClick,
                      disabled: this.isDateInvalid,
                      text: this.locale.confirm
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          type: 'primary',
                          disabled: this.isDateInvalid,
                          onClick: this.handleConfirmClick
                        },
                        {
                          default: () => this.locale.confirm
                        }
                      )
                    ]
                  )
                : null
            )
          )
        : null,
      h(FocusDetector, {
        onFocus: this.handleFocusDetectorFocus
      })
    )
  }
})
const PanelHeader = defineComponent({
  props: {
    mergedClsPrefix: {
      type: String,
      required: true
    },
    value: Number,
    monthBeforeYear: {
      type: Boolean,
      required: true
    },
    monthYearSeparator: {
      type: String,
      required: true
    },
    calendarMonth: {
      type: String,
      required: true
    },
    calendarYear: {
      type: String,
      required: true
    },
    onUpdateValue: {
      type: Function,
      required: true
    }
  },
  setup() {
    const triggerRef = ref(null)
    const monthPanelRef = ref(null)
    const showRef = ref(false)
    function handleClickOutside(e) {
      var _a
      if (
        showRef.value &&
        !((_a = triggerRef.value) === null || _a === void 0
          ? void 0
          : _a.contains(getPreciseEventTarget(e)))
      ) {
        showRef.value = false
      }
    }
    function handleHeaderClick() {
      showRef.value = !showRef.value
    }
    return {
      show: showRef,
      triggerRef,
      monthPanelRef,
      handleHeaderClick,
      handleClickOutside
    }
  },
  render() {
    const { handleClickOutside, mergedClsPrefix } = this
    return h(
      'div',
      {
        class: `${mergedClsPrefix}-date-panel-month__month-year`,
        ref: 'triggerRef'
      },
      h(Binder, null, {
        default: () => [
          h(VTarget, null, {
            default: () =>
              h(
                'div',
                {
                  class: [
                    `${mergedClsPrefix}-date-panel-month__text`,
                    this.show && `${mergedClsPrefix}-date-panel-month__text--active`
                  ],
                  onClick: this.handleHeaderClick
                },
                this.monthBeforeYear
                  ? [this.calendarMonth, this.monthYearSeparator, this.calendarYear]
                  : [this.calendarYear, this.monthYearSeparator, this.calendarMonth]
              )
          }),
          h(
            VFollower,
            {
              show: this.show,
              teleportDisabled: true
            },
            {
              default: () =>
                h(
                  Transition,
                  {
                    name: 'fade-in-scale-up-transition',
                    appear: true
                  },
                  {
                    default: () =>
                      this.show
                        ? withDirectives(
                            h(MonthPanel, {
                              ref: 'monthPanelRef',
                              onUpdateValue: this.onUpdateValue,
                              actions: [],
                              calendarHeaderMonthYearSeparator: this.monthYearSeparator,
                              // month and year click show month type
                              type: 'month',
                              key: 'month',
                              useAsQuickJump: true,
                              value: this.value
                            }),
                            [
                              [
                                clickoutside,
                                handleClickOutside,
                                void 0,
                                {
                                  capture: true
                                }
                              ]
                            ]
                          )
                        : null
                  }
                )
            }
          )
        ]
      })
    )
  }
})
const DatePanel = defineComponent({
  name: 'DatePanel',
  props: Object.assign(Object.assign({}, useCalendarProps), {
    type: {
      type: String,
      required: true
    }
  }),
  setup(props) {
    return useCalendar(props, props.type)
  },
  render() {
    var _a, _b, _c
    const { mergedClsPrefix, mergedTheme, shortcuts, onRender, datePickerSlots, type } = this
    onRender === null || onRender === void 0 ? void 0 : onRender()
    return h(
      'div',
      {
        ref: 'selfRef',
        tabindex: 0,
        class: [
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--${type}`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ],
        onFocus: this.handlePanelFocus,
        onKeydown: this.handlePanelKeyDown
      },
      h(
        'div',
        {
          class: `${mergedClsPrefix}-date-panel-calendar`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month`
          },
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-prev`,
              onClick: this.prevYear
            },
            resolveSlot(datePickerSlots['prev-year'], () => [h(FastBackwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__prev`,
              onClick: this.prevMonth
            },
            resolveSlot(datePickerSlots['prev-month'], () => [h(BackwardIcon, null)])
          ),
          h(PanelHeader, {
            monthYearSeparator: this.calendarHeaderMonthYearSeparator,
            monthBeforeYear: this.calendarMonthBeforeYear,
            value: this.calendarValue,
            onUpdateValue: this.onUpdateCalendarValue,
            mergedClsPrefix,
            calendarMonth: this.calendarMonth,
            calendarYear: this.calendarYear
          }),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__next`,
              onClick: this.nextMonth
            },
            resolveSlot(datePickerSlots['next-month'], () => [h(ForwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-next`,
              onClick: this.nextYear
            },
            resolveSlot(datePickerSlots['next-year'], () => [h(FastForwardIcon, null)])
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-weekdays`
          },
          this.weekdays.map((weekday) =>
            h(
              'div',
              {
                key: weekday,
                class: `${mergedClsPrefix}-date-panel-weekdays__day`
              },
              weekday
            )
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-dates`
          },
          this.dateArray.map((dateItem2, i) =>
            h(
              'div',
              {
                'data-n-date': true,
                key: i,
                class: [
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem2.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem2.selected,
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem2.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem2.ts,
                      {
                        type: 'date',
                        year: dateItem2.dateObject.year,
                        month: dateItem2.dateObject.month,
                        date: dateItem2.dateObject.date
                      }
                    ),
                    [`${mergedClsPrefix}-date-panel-date--week-hovered`]:
                      this.isWeekHovered(dateItem2),
                    [`${mergedClsPrefix}-date-panel-date--week-selected`]: dateItem2.inSelectedWeek
                  }
                ],
                onClick: () => {
                  this.handleDateClick(dateItem2)
                },
                onMouseenter: () => {
                  this.handleDateMouseEnter(dateItem2)
                }
              },
              h('div', {
                class: `${mergedClsPrefix}-date-panel-date__trigger`
              }),
              dateItem2.dateObject.date,
              dateItem2.isCurrentDate
                ? h('div', {
                    class: `${mergedClsPrefix}-date-panel-date__sup`
                  })
                : null
            )
          )
        )
      ),
      this.datePickerSlots.footer
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-footer`
            },
            this.datePickerSlots.footer()
          )
        : null,
      ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-actions`
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__prefix`
              },
              shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut)
                    ? null
                    : h(
                        XButton,
                        {
                          size: 'tiny',
                          onMouseenter: () => {
                            this.handleSingleShortcutMouseenter(shortcut)
                          },
                          onClick: () => {
                            this.handleSingleShortcutClick(shortcut)
                          },
                          onMouseleave: () => {
                            this.handleShortcutMouseleave()
                          }
                        },
                        {
                          default: () => key
                        }
                      )
                })
            ),
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__suffix`
              },
              ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                ? resolveSlotWithTypedProps(
                    this.$slots.clear,
                    {
                      onClear: this.handleClearClick,
                      text: this.locale.clear
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleClearClick
                        },
                        {
                          default: () => this.locale.clear
                        }
                      )
                    ]
                  )
                : null,
              ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now'))
                ? resolveSlotWithTypedProps(
                    this.$slots.now,
                    {
                      onNow: this.handleNowClick,
                      text: this.locale.now
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleNowClick
                        },
                        {
                          default: () => this.locale.now
                        }
                      )
                    ]
                  )
                : null
            )
          )
        : null,
      h(FocusDetector, {
        onFocus: this.handleFocusDetectorFocus
      })
    )
  }
})
const useDualCalendarProps = Object.assign(Object.assign({}, usePanelCommonProps), {
  defaultCalendarStartTime: Number,
  defaultCalendarEndTime: Number,
  bindCalendarMonths: Boolean,
  actions: {
    type: Array,
    default: () => ['clear', 'confirm']
  }
})
function useDualCalendar(props, type) {
  var _a, _b
  const {
    isDateDisabledRef,
    isStartHourDisabledRef,
    isEndHourDisabledRef,
    isStartMinuteDisabledRef,
    isEndMinuteDisabledRef,
    isStartSecondDisabledRef,
    isEndSecondDisabledRef,
    isStartDateInvalidRef,
    isEndDateInvalidRef,
    isStartTimeInvalidRef,
    isEndTimeInvalidRef,
    isStartValueInvalidRef,
    isEndValueInvalidRef,
    isRangeInvalidRef,
    localeRef,
    rangesRef,
    closeOnSelectRef,
    updateValueOnCloseRef,
    firstDayOfWeekRef,
    datePickerSlots,
    monthFormatRef,
    yearFormatRef,
    quarterFormatRef,
    yearRangeRef
  } = inject(datePickerInjectionKey)
  const validation = {
    isDateDisabled: isDateDisabledRef,
    isStartHourDisabled: isStartHourDisabledRef,
    isEndHourDisabled: isEndHourDisabledRef,
    isStartMinuteDisabled: isStartMinuteDisabledRef,
    isEndMinuteDisabled: isEndMinuteDisabledRef,
    isStartSecondDisabled: isStartSecondDisabledRef,
    isEndSecondDisabled: isEndSecondDisabledRef,
    isStartDateInvalid: isStartDateInvalidRef,
    isEndDateInvalid: isEndDateInvalidRef,
    isStartTimeInvalid: isStartTimeInvalidRef,
    isEndTimeInvalid: isEndTimeInvalidRef,
    isStartValueInvalid: isStartValueInvalidRef,
    isEndValueInvalid: isEndValueInvalidRef,
    isRangeInvalid: isRangeInvalidRef
  }
  const panelCommon = usePanelCommon(props)
  const startDatesElRef = ref(null)
  const endDatesElRef = ref(null)
  const startYearScrollbarRef = ref(null)
  const endYearScrollbarRef = ref(null)
  const startYearVlRef = ref(null)
  const endYearVlRef = ref(null)
  const startMonthScrollbarRef = ref(null)
  const endMonthScrollbarRef = ref(null)
  const { value } = props
  const defaultCalendarStartTime =
    (_a = props.defaultCalendarStartTime) !== null && _a !== void 0
      ? _a
      : Array.isArray(value) && typeof value[0] === 'number'
        ? value[0]
        : Date.now()
  const startCalendarDateTimeRef = ref(defaultCalendarStartTime)
  const endCalendarDateTimeRef = ref(
    (_b = props.defaultCalendarEndTime) !== null && _b !== void 0
      ? _b
      : Array.isArray(value) && typeof value[1] === 'number'
        ? value[1]
        : getTime(addMonths(defaultCalendarStartTime, 1))
  )
  adjustCalendarTimes(true)
  const nowRef = ref(Date.now())
  const isSelectingRef = ref(false)
  const memorizedStartDateTimeRef = ref(0)
  const mergedDateFormatRef = computed(() => props.dateFormat || localeRef.value.dateFormat)
  const mergedDayFormatRef = computed(() => props.calendarDayFormat || localeRef.value.dayFormat)
  const startDateInput = ref(
    Array.isArray(value)
      ? format$1(value[0], mergedDateFormatRef.value, panelCommon.dateFnsOptions.value)
      : ''
  )
  const endDateInputRef = ref(
    Array.isArray(value)
      ? format$1(value[1], mergedDateFormatRef.value, panelCommon.dateFnsOptions.value)
      : ''
  )
  const selectingPhaseRef = computed(() => {
    if (isSelectingRef.value) return 'end'
    else return 'start'
  })
  const startDateArrayRef = computed(() => {
    var _a2
    return dateArray(
      startCalendarDateTimeRef.value,
      props.value,
      nowRef.value,
      (_a2 = firstDayOfWeekRef.value) !== null && _a2 !== void 0
        ? _a2
        : localeRef.value.firstDayOfWeek
    )
  })
  const endDateArrayRef = computed(() => {
    var _a2
    return dateArray(
      endCalendarDateTimeRef.value,
      props.value,
      nowRef.value,
      (_a2 = firstDayOfWeekRef.value) !== null && _a2 !== void 0
        ? _a2
        : localeRef.value.firstDayOfWeek
    )
  })
  const weekdaysRef = computed(() => {
    return startDateArrayRef.value.slice(0, 7).map((dateItem2) => {
      const { ts } = dateItem2
      return format$1(ts, mergedDayFormatRef.value, panelCommon.dateFnsOptions.value)
    })
  })
  const startCalendarMonthRef = computed(() => {
    return format$1(
      startCalendarDateTimeRef.value,
      props.calendarHeaderMonthFormat || localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const endCalendarMonthRef = computed(() => {
    return format$1(
      endCalendarDateTimeRef.value,
      props.calendarHeaderMonthFormat || localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const startCalendarYearRef = computed(() => {
    return format$1(
      startCalendarDateTimeRef.value,
      props.calendarHeaderYearFormat || localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const endCalendarYearRef = computed(() => {
    return format$1(
      endCalendarDateTimeRef.value,
      props.calendarHeaderYearFormat || localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const startTimeValueRef = computed(() => {
    const { value: value2 } = props
    if (Array.isArray(value2)) return value2[0]
    return null
  })
  const endTimeValueRef = computed(() => {
    const { value: value2 } = props
    if (Array.isArray(value2)) return value2[1]
    return null
  })
  const shortcutsRef = computed(() => {
    const { shortcuts } = props
    return shortcuts || rangesRef.value
  })
  const startYearArrayRef = computed(() => {
    return yearArray(
      pluckValueFromRange(props.value, 'start'),
      nowRef.value,
      {
        yearFormat: yearFormatRef.value
      },
      yearRangeRef
    )
  })
  const endYearArrayRef = computed(() => {
    return yearArray(
      pluckValueFromRange(props.value, 'end'),
      nowRef.value,
      {
        yearFormat: yearFormatRef.value
      },
      yearRangeRef
    )
  })
  const startQuarterArrayRef = computed(() => {
    const startValue = pluckValueFromRange(props.value, 'start')
    return quarterArray(
      startValue !== null && startValue !== void 0 ? startValue : Date.now(),
      startValue,
      nowRef.value,
      {
        quarterFormat: quarterFormatRef.value
      }
    )
  })
  const endQuarterArrayRef = computed(() => {
    const endValue = pluckValueFromRange(props.value, 'end')
    return quarterArray(
      endValue !== null && endValue !== void 0 ? endValue : Date.now(),
      endValue,
      nowRef.value,
      {
        quarterFormat: quarterFormatRef.value
      }
    )
  })
  const startMonthArrayRef = computed(() => {
    const startValue = pluckValueFromRange(props.value, 'start')
    return monthArray(
      startValue !== null && startValue !== void 0 ? startValue : Date.now(),
      startValue,
      nowRef.value,
      {
        monthFormat: monthFormatRef.value
      }
    )
  })
  const endMonthArrayRef = computed(() => {
    const endValue = pluckValueFromRange(props.value, 'end')
    return monthArray(
      endValue !== null && endValue !== void 0 ? endValue : Date.now(),
      endValue,
      nowRef.value,
      {
        monthFormat: monthFormatRef.value
      }
    )
  })
  const calendarMonthBeforeYearRef = computed(() => {
    var _a2
    return (_a2 = props.calendarHeaderMonthBeforeYear) !== null && _a2 !== void 0
      ? _a2
      : localeRef.value.monthBeforeYear
  })
  watch(
    computed(() => props.value),
    (value2) => {
      if (value2 !== null && Array.isArray(value2)) {
        const [startMoment, endMoment] = value2
        startDateInput.value = format$1(
          startMoment,
          mergedDateFormatRef.value,
          panelCommon.dateFnsOptions.value
        )
        endDateInputRef.value = format$1(
          endMoment,
          mergedDateFormatRef.value,
          panelCommon.dateFnsOptions.value
        )
        if (!isSelectingRef.value) {
          syncCalendarTimeWithValue(value2)
        }
      } else {
        startDateInput.value = ''
        endDateInputRef.value = ''
      }
    }
  )
  function handleCalendarChange(value2, oldValue) {
    if (type === 'daterange' || type === 'datetimerange') {
      if (getYear(value2) !== getYear(oldValue) || getMonth(value2) !== getMonth(oldValue)) {
        panelCommon.disableTransitionOneTick()
      }
    }
  }
  watch(startCalendarDateTimeRef, handleCalendarChange)
  watch(endCalendarDateTimeRef, handleCalendarChange)
  function adjustCalendarTimes(byStartCalendarTime) {
    const startTime = startOfMonth(startCalendarDateTimeRef.value)
    const endTime = startOfMonth(endCalendarDateTimeRef.value)
    if (props.bindCalendarMonths || startTime >= endTime) {
      if (byStartCalendarTime) {
        endCalendarDateTimeRef.value = getTime(addMonths(startTime, 1))
      } else {
        startCalendarDateTimeRef.value = getTime(addMonths(endTime, -1))
      }
    }
  }
  function startCalendarNextYear() {
    startCalendarDateTimeRef.value = getTime(addMonths(startCalendarDateTimeRef.value, 12))
    adjustCalendarTimes(true)
  }
  function startCalendarPrevYear() {
    startCalendarDateTimeRef.value = getTime(addMonths(startCalendarDateTimeRef.value, -12))
    adjustCalendarTimes(true)
  }
  function startCalendarNextMonth() {
    startCalendarDateTimeRef.value = getTime(addMonths(startCalendarDateTimeRef.value, 1))
    adjustCalendarTimes(true)
  }
  function startCalendarPrevMonth() {
    startCalendarDateTimeRef.value = getTime(addMonths(startCalendarDateTimeRef.value, -1))
    adjustCalendarTimes(true)
  }
  function endCalendarNextYear() {
    endCalendarDateTimeRef.value = getTime(addMonths(endCalendarDateTimeRef.value, 12))
    adjustCalendarTimes(false)
  }
  function endCalendarPrevYear() {
    endCalendarDateTimeRef.value = getTime(addMonths(endCalendarDateTimeRef.value, -12))
    adjustCalendarTimes(false)
  }
  function endCalendarNextMonth() {
    endCalendarDateTimeRef.value = getTime(addMonths(endCalendarDateTimeRef.value, 1))
    adjustCalendarTimes(false)
  }
  function endCalendarPrevMonth() {
    endCalendarDateTimeRef.value = getTime(addMonths(endCalendarDateTimeRef.value, -1))
    adjustCalendarTimes(false)
  }
  function onUpdateStartCalendarValue(value2) {
    startCalendarDateTimeRef.value = value2
    adjustCalendarTimes(true)
  }
  function onUpdateEndCalendarValue(value2) {
    endCalendarDateTimeRef.value = value2
    adjustCalendarTimes(false)
  }
  function mergedIsDateDisabled(ts) {
    const isDateDisabled = isDateDisabledRef.value
    if (!isDateDisabled) return false
    if (!Array.isArray(props.value)) {
      return isDateDisabled(ts, 'start', null)
    }
    if (selectingPhaseRef.value === 'start') {
      return isDateDisabled(ts, 'start', null)
    } else {
      const { value: memorizedStartDateTime } = memorizedStartDateTimeRef
      if (ts < memorizedStartDateTimeRef.value) {
        return isDateDisabled(ts, 'start', [memorizedStartDateTime, memorizedStartDateTime])
      } else {
        return isDateDisabled(ts, 'end', [memorizedStartDateTime, memorizedStartDateTime])
      }
    }
  }
  function syncCalendarTimeWithValue(value2) {
    if (value2 === null) return
    const [startMoment, endMoment] = value2
    startCalendarDateTimeRef.value = startMoment
    if (startOfMonth(endMoment) <= startOfMonth(startMoment)) {
      endCalendarDateTimeRef.value = getTime(startOfMonth(addMonths(startMoment, 1)))
    } else {
      endCalendarDateTimeRef.value = getTime(startOfMonth(endMoment))
    }
  }
  function handleDateClick(dateItem2) {
    if (!isSelectingRef.value) {
      isSelectingRef.value = true
      memorizedStartDateTimeRef.value = dateItem2.ts
      changeStartEndTime(dateItem2.ts, dateItem2.ts, 'done')
    } else {
      isSelectingRef.value = false
      const { value: value2 } = props
      if (props.panel && Array.isArray(value2)) {
        changeStartEndTime(value2[0], value2[1], 'done')
      } else {
        if (closeOnSelectRef.value && type === 'daterange') {
          if (updateValueOnCloseRef.value) {
            closeCalendar()
          } else {
            handleConfirmClick()
          }
        }
      }
    }
  }
  function handleDateMouseEnter(dateItem2) {
    if (isSelectingRef.value) {
      if (mergedIsDateDisabled(dateItem2.ts)) return
      if (dateItem2.ts >= memorizedStartDateTimeRef.value) {
        changeStartEndTime(memorizedStartDateTimeRef.value, dateItem2.ts, 'wipPreview')
      } else {
        changeStartEndTime(dateItem2.ts, memorizedStartDateTimeRef.value, 'wipPreview')
      }
    }
  }
  function handleConfirmClick() {
    if (isRangeInvalidRef.value) {
      return
    }
    panelCommon.doConfirm()
    closeCalendar()
  }
  function closeCalendar() {
    isSelectingRef.value = false
    if (props.active) {
      panelCommon.doClose()
    }
  }
  function changeStartDateTime(time2) {
    if (typeof time2 !== 'number') {
      time2 = getTime(time2)
    }
    if (props.value === null) {
      panelCommon.doUpdateValue([time2, time2], props.panel)
    } else if (Array.isArray(props.value)) {
      panelCommon.doUpdateValue([time2, Math.max(props.value[1], time2)], props.panel)
    }
  }
  function changeEndDateTime(time2) {
    if (typeof time2 !== 'number') {
      time2 = getTime(time2)
    }
    if (props.value === null) {
      panelCommon.doUpdateValue([time2, time2], props.panel)
    } else if (Array.isArray(props.value)) {
      panelCommon.doUpdateValue([Math.min(props.value[0], time2), time2], props.panel)
    }
  }
  function changeStartEndTime(startTime, endTime, source) {
    if (typeof startTime !== 'number') {
      startTime = getTime(startTime)
    }
    if (source !== 'shortcutPreview' && source !== 'shortcutDone') {
      let startDefaultTime
      let endDefaultTime
      if (type === 'datetimerange') {
        const { defaultTime } = props
        if (Array.isArray(defaultTime)) {
          startDefaultTime = getDefaultTime(defaultTime[0])
          endDefaultTime = getDefaultTime(defaultTime[1])
        } else {
          startDefaultTime = getDefaultTime(defaultTime)
          endDefaultTime = startDefaultTime
        }
      }
      if (startDefaultTime) {
        startTime = getTime(set(startTime, startDefaultTime))
      }
      if (endDefaultTime) {
        endTime = getTime(set(endTime, endDefaultTime))
      }
    }
    panelCommon.doUpdateValue(
      [startTime, endTime],
      props.panel && (source === 'done' || source === 'shortcutDone')
    )
  }
  function sanitizeValue(datetime) {
    if (type === 'datetimerange') {
      return getTime(startOfSecond(datetime))
    } else if (type === 'monthrange') {
      return getTime(startOfMonth(datetime))
    } else {
      return getTime(startOfDay(datetime))
    }
  }
  function handleStartDateInput(value2) {
    const date = strictParse(
      value2,
      mergedDateFormatRef.value,
      /* @__PURE__ */ new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (!props.value) {
        const newValue = set(/* @__PURE__ */ new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(props.value)) {
        const newValue = set(props.value[0], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      startDateInput.value = value2
    }
  }
  function handleEndDateInput(value2) {
    const date = strictParse(
      value2,
      mergedDateFormatRef.value,
      /* @__PURE__ */ new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        const newValue = set(/* @__PURE__ */ new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(props.value)) {
        const newValue = set(props.value[1], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      endDateInputRef.value = value2
    }
  }
  function handleStartDateInputBlur() {
    const date = strictParse(
      startDateInput.value,
      mergedDateFormatRef.value,
      /* @__PURE__ */ new Date(),
      panelCommon.dateFnsOptions.value
    )
    const { value: value2 } = props
    if (isValid(date)) {
      if (value2 === null) {
        const newValue = set(/* @__PURE__ */ new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(value2)) {
        const newValue = set(value2[0], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function handleEndDateInputBlur() {
    const date = strictParse(
      endDateInputRef.value,
      mergedDateFormatRef.value,
      /* @__PURE__ */ new Date(),
      panelCommon.dateFnsOptions.value
    )
    const { value: value2 } = props
    if (isValid(date)) {
      if (value2 === null) {
        const newValue = set(/* @__PURE__ */ new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(value2)) {
        const newValue = set(value2[1], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function refreshDisplayDateString(times) {
    const { value: value2 } = props
    if (value2 === null || !Array.isArray(value2)) {
      startDateInput.value = ''
      endDateInputRef.value = ''
      return
    }
    if (times === void 0) {
      times = value2
    }
    startDateInput.value = format$1(
      times[0],
      mergedDateFormatRef.value,
      panelCommon.dateFnsOptions.value
    )
    endDateInputRef.value = format$1(
      times[1],
      mergedDateFormatRef.value,
      panelCommon.dateFnsOptions.value
    )
  }
  function handleStartTimePickerChange(value2) {
    if (value2 === null) return
    changeStartDateTime(value2)
  }
  function handleEndTimePickerChange(value2) {
    if (value2 === null) return
    changeEndDateTime(value2)
  }
  function handleRangeShortcutMouseenter(shortcut) {
    panelCommon.cachePendingValue()
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (!Array.isArray(shortcutValue)) return
    changeStartEndTime(shortcutValue[0], shortcutValue[1], 'shortcutPreview')
  }
  function handleRangeShortcutClick(shortcut) {
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (!Array.isArray(shortcutValue)) return
    changeStartEndTime(shortcutValue[0], shortcutValue[1], 'shortcutDone')
    panelCommon.clearPendingValue()
    handleConfirmClick()
  }
  function justifyColumnsScrollState(value2, type2) {
    const mergedValue = value2 === void 0 ? props.value : value2
    if (value2 === void 0 || type2 === 'start') {
      if (startMonthScrollbarRef.value) {
        const monthIndex = !Array.isArray(mergedValue)
          ? getMonth(Date.now())
          : getMonth(mergedValue[0])
        startMonthScrollbarRef.value.scrollTo({
          debounce: false,
          index: monthIndex,
          elSize: MONTH_ITEM_HEIGHT
        })
      }
      if (startYearVlRef.value) {
        const yearIndex =
          (!Array.isArray(mergedValue) ? getYear(Date.now()) : getYear(mergedValue[0])) -
          yearRangeRef.value[0]
        startYearVlRef.value.scrollTo({
          index: yearIndex,
          debounce: false
        })
      }
    }
    if (value2 === void 0 || type2 === 'end') {
      if (endMonthScrollbarRef.value) {
        const monthIndex = !Array.isArray(mergedValue)
          ? getMonth(Date.now())
          : getMonth(mergedValue[1])
        endMonthScrollbarRef.value.scrollTo({
          debounce: false,
          index: monthIndex,
          elSize: MONTH_ITEM_HEIGHT
        })
      }
      if (endYearVlRef.value) {
        const yearIndex =
          (!Array.isArray(mergedValue) ? getYear(Date.now()) : getYear(mergedValue[1])) -
          yearRangeRef.value[0]
        endYearVlRef.value.scrollTo({
          index: yearIndex,
          debounce: false
        })
      }
    }
  }
  function handleColItemClick(dateItem2, clickType) {
    const { value: value2 } = props
    const noCurrentValue = !Array.isArray(value2)
    const itemTs =
      dateItem2.type === 'year' && type !== 'yearrange'
        ? noCurrentValue
          ? set(dateItem2.ts, {
              month: getMonth(
                type === 'quarterrange'
                  ? startOfQuarter(/* @__PURE__ */ new Date())
                  : /* @__PURE__ */ new Date()
              )
            }).valueOf()
          : set(dateItem2.ts, {
              month: getMonth(
                type === 'quarterrange'
                  ? startOfQuarter(value2[clickType === 'start' ? 0 : 1])
                  : value2[clickType === 'start' ? 0 : 1]
              )
            }).valueOf()
        : dateItem2.ts
    if (noCurrentValue) {
      const partialValue = sanitizeValue(itemTs)
      const nextValue2 = [partialValue, partialValue]
      panelCommon.doUpdateValue(nextValue2, props.panel)
      justifyColumnsScrollState(nextValue2, 'start')
      justifyColumnsScrollState(nextValue2, 'end')
      panelCommon.disableTransitionOneTick()
      return
    }
    const nextValue = [value2[0], value2[1]]
    let otherPartsChanged = false
    if (clickType === 'start') {
      nextValue[0] = sanitizeValue(itemTs)
      if (nextValue[0] > nextValue[1]) {
        nextValue[1] = nextValue[0]
        otherPartsChanged = true
      }
    } else {
      nextValue[1] = sanitizeValue(itemTs)
      if (nextValue[0] > nextValue[1]) {
        nextValue[0] = nextValue[1]
        otherPartsChanged = true
      }
    }
    panelCommon.doUpdateValue(nextValue, props.panel)
    switch (type) {
      case 'monthrange':
      case 'quarterrange':
        panelCommon.disableTransitionOneTick()
        if (otherPartsChanged) {
          justifyColumnsScrollState(nextValue, 'start')
          justifyColumnsScrollState(nextValue, 'end')
        } else {
          justifyColumnsScrollState(nextValue, clickType)
        }
        break
      case 'yearrange':
        panelCommon.disableTransitionOneTick()
        justifyColumnsScrollState(nextValue, 'start')
        justifyColumnsScrollState(nextValue, 'end')
    }
  }
  function handleStartYearVlScroll() {
    var _a2
    ;(_a2 = startYearScrollbarRef.value) === null || _a2 === void 0 ? void 0 : _a2.sync()
  }
  function handleEndYearVlScroll() {
    var _a2
    ;(_a2 = endYearScrollbarRef.value) === null || _a2 === void 0 ? void 0 : _a2.sync()
  }
  function virtualListContainer(type2) {
    var _a2, _b2
    if (type2 === 'start') {
      return (
        ((_a2 = startYearVlRef.value) === null || _a2 === void 0 ? void 0 : _a2.listElRef) || null
      )
    } else {
      return (
        ((_b2 = endYearVlRef.value) === null || _b2 === void 0 ? void 0 : _b2.listElRef) || null
      )
    }
  }
  function virtualListContent(type2) {
    var _a2, _b2
    if (type2 === 'start') {
      return (
        ((_a2 = startYearVlRef.value) === null || _a2 === void 0 ? void 0 : _a2.itemsElRef) || null
      )
    } else {
      return (
        ((_b2 = endYearVlRef.value) === null || _b2 === void 0 ? void 0 : _b2.itemsElRef) || null
      )
    }
  }
  const childComponentRefs = {
    startYearVlRef,
    endYearVlRef,
    startMonthScrollbarRef,
    endMonthScrollbarRef,
    startYearScrollbarRef,
    endYearScrollbarRef
  }
  return Object.assign(
    Object.assign(
      Object.assign(
        Object.assign(
          {
            startDatesElRef,
            endDatesElRef,
            handleDateClick,
            handleColItemClick,
            handleDateMouseEnter,
            handleConfirmClick,
            startCalendarPrevYear,
            startCalendarPrevMonth,
            startCalendarNextYear,
            startCalendarNextMonth,
            endCalendarPrevYear,
            endCalendarPrevMonth,
            endCalendarNextMonth,
            endCalendarNextYear,
            mergedIsDateDisabled,
            changeStartEndTime,
            ranges: rangesRef,
            calendarMonthBeforeYear: calendarMonthBeforeYearRef,
            startCalendarMonth: startCalendarMonthRef,
            startCalendarYear: startCalendarYearRef,
            endCalendarMonth: endCalendarMonthRef,
            endCalendarYear: endCalendarYearRef,
            weekdays: weekdaysRef,
            startDateArray: startDateArrayRef,
            endDateArray: endDateArrayRef,
            startYearArray: startYearArrayRef,
            startMonthArray: startMonthArrayRef,
            startQuarterArray: startQuarterArrayRef,
            endYearArray: endYearArrayRef,
            endMonthArray: endMonthArrayRef,
            endQuarterArray: endQuarterArrayRef,
            isSelecting: isSelectingRef,
            handleRangeShortcutMouseenter,
            handleRangeShortcutClick
          },
          panelCommon
        ),
        validation
      ),
      childComponentRefs
    ),
    {
      // datetimerangeonly
      startDateDisplayString: startDateInput,
      endDateInput: endDateInputRef,
      timePickerSize: panelCommon.timePickerSize,
      startTimeValue: startTimeValueRef,
      endTimeValue: endTimeValueRef,
      datePickerSlots,
      shortcuts: shortcutsRef,
      startCalendarDateTime: startCalendarDateTimeRef,
      endCalendarDateTime: endCalendarDateTimeRef,
      justifyColumnsScrollState,
      handleFocusDetectorFocus: panelCommon.handleFocusDetectorFocus,
      handleStartTimePickerChange,
      handleEndTimePickerChange,
      handleStartDateInput,
      handleStartDateInputBlur,
      handleEndDateInput,
      handleEndDateInputBlur,
      handleStartYearVlScroll,
      handleEndYearVlScroll,
      virtualListContainer,
      virtualListContent,
      onUpdateStartCalendarValue,
      onUpdateEndCalendarValue
    }
  )
}
const DaterangePanel = defineComponent({
  name: 'DateRangePanel',
  props: useDualCalendarProps,
  setup(props) {
    return useDualCalendar(props, 'daterange')
  },
  render() {
    var _a, _b, _c
    const { mergedClsPrefix, mergedTheme, shortcuts, onRender, datePickerSlots } = this
    onRender === null || onRender === void 0 ? void 0 : onRender()
    return h(
      'div',
      {
        ref: 'selfRef',
        tabindex: 0,
        class: [
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--daterange`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ],
        onKeydown: this.handlePanelKeyDown,
        onFocus: this.handlePanelFocus
      },
      h(
        'div',
        {
          ref: 'startDatesElRef',
          class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month`
          },
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-prev`,
              onClick: this.startCalendarPrevYear
            },
            resolveSlot(datePickerSlots['prev-year'], () => [h(FastBackwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__prev`,
              onClick: this.startCalendarPrevMonth
            },
            resolveSlot(datePickerSlots['prev-month'], () => [h(BackwardIcon, null)])
          ),
          h(PanelHeader, {
            monthYearSeparator: this.calendarHeaderMonthYearSeparator,
            monthBeforeYear: this.calendarMonthBeforeYear,
            value: this.startCalendarDateTime,
            onUpdateValue: this.onUpdateStartCalendarValue,
            mergedClsPrefix,
            calendarMonth: this.startCalendarMonth,
            calendarYear: this.startCalendarYear
          }),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__next`,
              onClick: this.startCalendarNextMonth
            },
            resolveSlot(datePickerSlots['next-month'], () => [h(ForwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-next`,
              onClick: this.startCalendarNextYear
            },
            resolveSlot(datePickerSlots['next-year'], () => [h(FastForwardIcon, null)])
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-weekdays`
          },
          this.weekdays.map((weekday) =>
            h(
              'div',
              {
                key: weekday,
                class: `${mergedClsPrefix}-date-panel-weekdays__day`
              },
              weekday
            )
          )
        ),
        h('div', {
          class: `${mergedClsPrefix}-date-panel__divider`
        }),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-dates`
          },
          this.startDateArray.map((dateItem2, i) =>
            h(
              'div',
              {
                'data-n-date': true,
                key: i,
                class: [
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem2.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem2.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem2.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem2.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]: dateItem2.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]: dateItem2.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem2.ts
                    )
                  }
                ],
                onClick: () => {
                  this.handleDateClick(dateItem2)
                },
                onMouseenter: () => {
                  this.handleDateMouseEnter(dateItem2)
                }
              },
              h('div', {
                class: `${mergedClsPrefix}-date-panel-date__trigger`
              }),
              dateItem2.dateObject.date,
              dateItem2.isCurrentDate
                ? h('div', {
                    class: `${mergedClsPrefix}-date-panel-date__sup`
                  })
                : null
            )
          )
        )
      ),
      h('div', {
        class: `${mergedClsPrefix}-date-panel__vertical-divider`
      }),
      h(
        'div',
        {
          ref: 'endDatesElRef',
          class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month`
          },
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-prev`,
              onClick: this.endCalendarPrevYear
            },
            resolveSlot(datePickerSlots['prev-year'], () => [h(FastBackwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__prev`,
              onClick: this.endCalendarPrevMonth
            },
            resolveSlot(datePickerSlots['prev-month'], () => [h(BackwardIcon, null)])
          ),
          h(PanelHeader, {
            monthYearSeparator: this.calendarHeaderMonthYearSeparator,
            monthBeforeYear: this.calendarMonthBeforeYear,
            value: this.endCalendarDateTime,
            onUpdateValue: this.onUpdateEndCalendarValue,
            mergedClsPrefix,
            calendarMonth: this.endCalendarMonth,
            calendarYear: this.endCalendarYear
          }),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__next`,
              onClick: this.endCalendarNextMonth
            },
            resolveSlot(datePickerSlots['next-month'], () => [h(ForwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-next`,
              onClick: this.endCalendarNextYear
            },
            resolveSlot(datePickerSlots['next-year'], () => [h(FastForwardIcon, null)])
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-weekdays`
          },
          this.weekdays.map((weekday) =>
            h(
              'div',
              {
                key: weekday,
                class: `${mergedClsPrefix}-date-panel-weekdays__day`
              },
              weekday
            )
          )
        ),
        h('div', {
          class: `${mergedClsPrefix}-date-panel__divider`
        }),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-dates`
          },
          this.endDateArray.map((dateItem2, i) =>
            h(
              'div',
              {
                'data-n-date': true,
                key: i,
                class: [
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem2.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem2.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem2.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem2.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]: dateItem2.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]: dateItem2.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem2.ts
                    )
                  }
                ],
                onClick: () => {
                  this.handleDateClick(dateItem2)
                },
                onMouseenter: () => {
                  this.handleDateMouseEnter(dateItem2)
                }
              },
              h('div', {
                class: `${mergedClsPrefix}-date-panel-date__trigger`
              }),
              dateItem2.dateObject.date,
              dateItem2.isCurrentDate
                ? h('div', {
                    class: `${mergedClsPrefix}-date-panel-date__sup`
                  })
                : null
            )
          )
        )
      ),
      this.datePickerSlots.footer
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-footer`
            },
            this.datePickerSlots.footer()
          )
        : null,
      ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-actions`
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__prefix`
              },
              shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut) || typeof shortcut === 'function'
                    ? h(
                        XButton,
                        {
                          size: 'tiny',
                          onMouseenter: () => {
                            this.handleRangeShortcutMouseenter(shortcut)
                          },
                          onClick: () => {
                            this.handleRangeShortcutClick(shortcut)
                          },
                          onMouseleave: () => {
                            this.handleShortcutMouseleave()
                          }
                        },
                        {
                          default: () => key
                        }
                      )
                    : null
                })
            ),
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__suffix`
              },
              ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                ? resolveSlotWithTypedProps(
                    datePickerSlots.clear,
                    {
                      onClear: this.handleClearClick,
                      text: this.locale.clear
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleClearClick
                        },
                        {
                          default: () => this.locale.clear
                        }
                      )
                    ]
                  )
                : null,
              ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('confirm'))
                ? resolveSlotWithTypedProps(
                    datePickerSlots.confirm,
                    {
                      onConfirm: this.handleConfirmClick,
                      disabled: this.isRangeInvalid || this.isSelecting,
                      text: this.locale.confirm
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          type: 'primary',
                          disabled: this.isRangeInvalid || this.isSelecting,
                          onClick: this.handleConfirmClick
                        },
                        {
                          default: () => this.locale.confirm
                        }
                      )
                    ]
                  )
                : null
            )
          )
        : null,
      h(FocusDetector, {
        onFocus: this.handleFocusDetectorFocus
      })
    )
  }
})
function tzIntlTimeZoneName(length, date, options) {
  const defaultOptions = getDefaultOptions()
  const dtf = getDTF(length, options.timeZone, options.locale ?? defaultOptions.locale)
  return 'formatToParts' in dtf ? partsTimeZone(dtf, date) : hackyTimeZone(dtf, date)
}
function partsTimeZone(dtf, date) {
  const formatted = dtf.formatToParts(date)
  for (let i = formatted.length - 1; i >= 0; --i) {
    if (formatted[i].type === 'timeZoneName') {
      return formatted[i].value
    }
  }
  return void 0
}
function hackyTimeZone(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, '')
  const tzNameMatch = / [\w-+ ]+$/.exec(formatted)
  return tzNameMatch ? tzNameMatch[0].substr(1) : ''
}
function getDTF(length, timeZone, locale) {
  return new Intl.DateTimeFormat(locale ? [locale.code, 'en-US'] : void 0, {
    timeZone,
    timeZoneName: length
  })
}
function tzTokenizeDate(date, timeZone) {
  const dtf = getDateTimeFormat(timeZone)
  return 'formatToParts' in dtf ? partsOffset(dtf, date) : hackyOffset(dtf, date)
}
const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
}
function partsOffset(dtf, date) {
  try {
    const formatted = dtf.formatToParts(date)
    const filled = []
    for (let i = 0; i < formatted.length; i++) {
      const pos = typeToPos[formatted[i].type]
      if (pos !== void 0) {
        filled[pos] = parseInt(formatted[i].value, 10)
      }
    }
    return filled
  } catch (error) {
    if (error instanceof RangeError) {
      return [NaN]
    }
    throw error
  }
}
function hackyOffset(dtf, date) {
  const formatted = dtf.format(date)
  const parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted)
  return [
    parseInt(parsed[3], 10),
    parseInt(parsed[1], 10),
    parseInt(parsed[2], 10),
    parseInt(parsed[4], 10),
    parseInt(parsed[5], 10),
    parseInt(parsed[6], 10)
  ]
}
const dtfCache = {}
const testDateFormatted = new Intl.DateTimeFormat('en-US', {
  hourCycle: 'h23',
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}).format(/* @__PURE__ */ new Date('2014-06-25T04:00:00.123Z'))
const hourCycleSupported =
  testDateFormatted === '06/25/2014, 00:00:00' ||
  testDateFormatted === '‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00'
function getDateTimeFormat(timeZone) {
  if (!dtfCache[timeZone]) {
    dtfCache[timeZone] = hourCycleSupported
      ? new Intl.DateTimeFormat('en-US', {
          hourCycle: 'h23',
          timeZone,
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      : new Intl.DateTimeFormat('en-US', {
          hour12: false,
          timeZone,
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
  }
  return dtfCache[timeZone]
}
function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
  const utcDate = /* @__PURE__ */ new Date(0)
  utcDate.setUTCFullYear(fullYear, month, day)
  utcDate.setUTCHours(hour, minute, second, millisecond)
  return utcDate
}
const MILLISECONDS_IN_HOUR$1 = 36e5
const MILLISECONDS_IN_MINUTE$2 = 6e4
const patterns$1 = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
}
function tzParseTimezone(timezoneString, date, isUtcDate) {
  if (!timezoneString) {
    return 0
  }
  let token = patterns$1.timezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }
  let hours
  let absoluteOffset
  token = patterns$1.timezoneHH.exec(timezoneString)
  if (token) {
    hours = parseInt(token[1], 10)
    if (!validateTimezone(hours)) {
      return NaN
    }
    return -(hours * MILLISECONDS_IN_HOUR$1)
  }
  token = patterns$1.timezoneHHMM.exec(timezoneString)
  if (token) {
    hours = parseInt(token[2], 10)
    const minutes = parseInt(token[3], 10)
    if (!validateTimezone(hours, minutes)) {
      return NaN
    }
    absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR$1 + minutes * MILLISECONDS_IN_MINUTE$2
    return token[1] === '+' ? -absoluteOffset : absoluteOffset
  }
  if (isValidTimezoneIANAString(timezoneString)) {
    date = new Date(date || Date.now())
    const utcDate = isUtcDate ? date : toUtcDate(date)
    const offset = calcOffset(utcDate, timezoneString)
    const fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString)
    return -fixedOffset
  }
  return NaN
}
function toUtcDate(date) {
  return newDateUTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )
}
function calcOffset(date, timezoneString) {
  const tokens = tzTokenizeDate(date, timezoneString)
  const asUTC = newDateUTC(
    tokens[0],
    tokens[1] - 1,
    tokens[2],
    tokens[3] % 24,
    tokens[4],
    tokens[5],
    0
  ).getTime()
  let asTS = date.getTime()
  const over = asTS % 1e3
  asTS -= over >= 0 ? over : 1e3 + over
  return asUTC - asTS
}
function fixOffset(date, offset, timezoneString) {
  const localTS = date.getTime()
  let utcGuess = localTS - offset
  const o2 = calcOffset(new Date(utcGuess), timezoneString)
  if (offset === o2) {
    return offset
  }
  utcGuess -= o2 - offset
  const o3 = calcOffset(new Date(utcGuess), timezoneString)
  if (o2 === o3) {
    return o2
  }
  return Math.max(o2, o3)
}
function validateTimezone(hours, minutes) {
  return -23 <= hours && hours <= 23 && (minutes == null || (0 <= minutes && minutes <= 59))
}
const validIANATimezoneCache = {}
function isValidTimezoneIANAString(timeZoneString) {
  if (validIANATimezoneCache[timeZoneString]) return true
  try {
    new Intl.DateTimeFormat(void 0, { timeZone: timeZoneString })
    validIANATimezoneCache[timeZoneString] = true
    return true
  } catch (error) {
    return false
  }
}
const MILLISECONDS_IN_MINUTE$1 = 60 * 1e3
const formatters = {
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, options) {
    const timezoneOffset = getTimeZoneOffset(options.timeZone, date)
    if (timezoneOffset === 0) {
      return 'Z'
    }
    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)
      // Hours, minutes and optional seconds without `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX':
        return formatTimezone(timezoneOffset)
      // Hours, minutes and optional seconds with `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX':
      // Hours and minutes with `:` delimeter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, options) {
    const timezoneOffset = getTimeZoneOffset(options.timeZone, date)
    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)
      // Hours, minutes and optional seconds without `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx':
        return formatTimezone(timezoneOffset)
      // Hours, minutes and optional seconds with `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx':
      // Hours and minutes with `:` delimeter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },
  // Timezone (GMT)
  O: function (date, token, options) {
    const timezoneOffset = getTimeZoneOffset(options.timeZone, date)
    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':')
    }
  },
  // Timezone (specific non-location)
  z: function (date, token, options) {
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return tzIntlTimeZoneName('short', date, options)
      // Long
      case 'zzzz':
      default:
        return tzIntlTimeZoneName('long', date, options)
    }
  }
}
function getTimeZoneOffset(timeZone, originalDate) {
  const timeZoneOffset = timeZone
    ? tzParseTimezone(timeZone, originalDate, true) / MILLISECONDS_IN_MINUTE$1
    : (originalDate?.getTimezoneOffset() ?? 0)
  if (Number.isNaN(timeZoneOffset)) {
    throw new RangeError('Invalid time zone specified: ' + timeZone)
  }
  return timeZoneOffset
}
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? '-' : ''
  let output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return sign + output
}
function formatTimezone(offset, delimiter = '') {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = addLeadingZeros(Math.floor(absOffset / 60), 2)
  const minutes = addLeadingZeros(Math.floor(absOffset % 60), 2)
  return sign + hours + delimiter + minutes
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? '-' : '+'
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2)
  }
  return formatTimezone(offset, delimiter)
}
function formatTimezoneShort(offset, delimiter = '') {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = Math.floor(absOffset / 60)
  const minutes = absOffset % 60
  if (minutes === 0) {
    return sign + String(hours)
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2)
}
function getTimezoneOffsetInMilliseconds(date) {
  const utcDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  )
  utcDate.setUTCFullYear(date.getFullYear())
  return +date - +utcDate
}
const tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/
const MILLISECONDS_IN_HOUR = 36e5
const MILLISECONDS_IN_MINUTE = 6e4
const DEFAULT_ADDITIONAL_DIGITS = 2
const patterns = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: tzPattern
}
function toDate(argument, options = {}) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
  }
  if (argument === null) {
    return /* @__PURE__ */ new Date(NaN)
  }
  const additionalDigits =
    options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits)
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2')
  }
  if (
    argument instanceof Date ||
    (typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]')
  ) {
    return new Date(argument.getTime())
  } else if (
    typeof argument === 'number' ||
    Object.prototype.toString.call(argument) === '[object Number]'
  ) {
    return new Date(argument)
  } else if (!(Object.prototype.toString.call(argument) === '[object String]')) {
    return /* @__PURE__ */ new Date(NaN)
  }
  const dateStrings = splitDateString(argument)
  const { year, restDateString } = parseYear(dateStrings.date, additionalDigits)
  const date = parseDate(restDateString, year)
  if (date === null || isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN)
  }
  if (date) {
    const timestamp = date.getTime()
    let time2 = 0
    let offset
    if (dateStrings.time) {
      time2 = parseTime(dateStrings.time)
      if (time2 === null || isNaN(time2)) {
        return /* @__PURE__ */ new Date(NaN)
      }
    }
    if (dateStrings.timeZone || options.timeZone) {
      offset = tzParseTimezone(
        dateStrings.timeZone || options.timeZone,
        new Date(timestamp + time2)
      )
      if (isNaN(offset)) {
        return /* @__PURE__ */ new Date(NaN)
      }
    } else {
      offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time2))
      offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time2 + offset))
    }
    return new Date(timestamp + time2 + offset)
  } else {
    return /* @__PURE__ */ new Date(NaN)
  }
}
function splitDateString(dateString) {
  const dateStrings = {}
  let parts = patterns.dateTimePattern.exec(dateString)
  let timeString
  if (!parts) {
    parts = patterns.datePattern.exec(dateString)
    if (parts) {
      dateStrings.date = parts[1]
      timeString = parts[2]
    } else {
      dateStrings.date = null
      timeString = dateString
    }
  } else {
    dateStrings.date = parts[1]
    timeString = parts[3]
  }
  if (timeString) {
    const token = patterns.timeZone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timeZone = token[1].trim()
    } else {
      dateStrings.time = timeString
    }
  }
  return dateStrings
}
function parseYear(dateString, additionalDigits) {
  if (dateString) {
    const patternYYY = patterns.YYY[additionalDigits]
    const patternYYYYY = patterns.YYYYY[additionalDigits]
    let token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString)
    if (token) {
      const yearString = token[1]
      return {
        year: parseInt(yearString, 10),
        restDateString: dateString.slice(yearString.length)
      }
    }
    token = patterns.YY.exec(dateString) || patternYYY.exec(dateString)
    if (token) {
      const centuryString = token[1]
      return {
        year: parseInt(centuryString, 10) * 100,
        restDateString: dateString.slice(centuryString.length)
      }
    }
  }
  return {
    year: null
  }
}
function parseDate(dateString, year) {
  if (year === null) {
    return null
  }
  let date
  let month
  let week
  if (!dateString || !dateString.length) {
    date = /* @__PURE__ */ new Date(0)
    date.setUTCFullYear(year)
    return date
  }
  let token = patterns.MM.exec(dateString)
  if (token) {
    date = /* @__PURE__ */ new Date(0)
    month = parseInt(token[1], 10) - 1
    if (!validateDate(year, month)) {
      return /* @__PURE__ */ new Date(NaN)
    }
    date.setUTCFullYear(year, month)
    return date
  }
  token = patterns.DDD.exec(dateString)
  if (token) {
    date = /* @__PURE__ */ new Date(0)
    const dayOfYear = parseInt(token[1], 10)
    if (!validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN)
    }
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }
  token = patterns.MMDD.exec(dateString)
  if (token) {
    date = /* @__PURE__ */ new Date(0)
    month = parseInt(token[1], 10) - 1
    const day = parseInt(token[2], 10)
    if (!validateDate(year, month, day)) {
      return /* @__PURE__ */ new Date(NaN)
    }
    date.setUTCFullYear(year, month, day)
    return date
  }
  token = patterns.Www.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    if (!validateWeekDate(week)) {
      return /* @__PURE__ */ new Date(NaN)
    }
    return dayOfISOWeekYear(year, week)
  }
  token = patterns.WwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    const dayOfWeek = parseInt(token[2], 10) - 1
    if (!validateWeekDate(week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN)
    }
    return dayOfISOWeekYear(year, week, dayOfWeek)
  }
  return null
}
function parseTime(timeString) {
  let hours
  let minutes
  let token = patterns.HH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    if (!validateTime(hours)) {
      return NaN
    }
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }
  token = patterns.HHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    if (!validateTime(hours, minutes)) {
      return NaN
    }
    return (hours % 24) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE
  }
  token = patterns.HHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    const seconds = parseFloat(token[3].replace(',', '.'))
    if (!validateTime(hours, minutes, seconds)) {
      return NaN
    }
    return (hours % 24) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1e3
  }
  return null
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  week = week || 0
  day = day || 0
  const date = /* @__PURE__ */ new Date(0)
  date.setUTCFullYear(isoWeekYear, 0, 4)
  const fourthOfJanuaryDay = date.getUTCDay() || 7
  const diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}
function validateDate(year, month, date) {
  if (month < 0 || month > 11) {
    return false
  }
  if (date != null) {
    if (date < 1) {
      return false
    }
    const isLeapYear = isLeapYearIndex(year)
    if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
      return false
    }
    if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
      return false
    }
  }
  return true
}
function validateDayOfYearDate(year, dayOfYear) {
  if (dayOfYear < 1) {
    return false
  }
  const isLeapYear = isLeapYearIndex(year)
  if (isLeapYear && dayOfYear > 366) {
    return false
  }
  if (!isLeapYear && dayOfYear > 365) {
    return false
  }
  return true
}
function validateWeekDate(week, day) {
  if (week < 0 || week > 52) {
    return false
  }
  if (day != null && (day < 0 || day > 6)) {
    return false
  }
  return true
}
function validateTime(hours, minutes, seconds) {
  if (hours < 0 || hours >= 25) {
    return false
  }
  if (minutes != null && (minutes < 0 || minutes >= 60)) {
    return false
  }
  if (seconds != null && (seconds < 0 || seconds >= 60)) {
    return false
  }
  return true
}
const tzFormattingTokensRegExp = /([xXOz]+)|''|'(''|[^'])+('|$)/g
function format(date, formatStr, options = {}) {
  formatStr = String(formatStr)
  const matches = formatStr.match(tzFormattingTokensRegExp)
  if (matches) {
    const d = toDate(options.originalDate || date, options)
    formatStr = matches.reduce(function (result, token) {
      if (token[0] === "'") {
        return result
      }
      const pos = result.indexOf(token)
      const precededByQuotedSection = result[pos - 1] === "'"
      const replaced = result.replace(token, "'" + formatters[token[0]](d, token, options) + "'")
      return precededByQuotedSection
        ? replaced.substring(0, pos - 1) + replaced.substring(pos + 1)
        : replaced
    }, formatStr)
  }
  return format$1(date, formatStr, options)
}
function toZonedTime(date, timeZone, options) {
  date = toDate(date, options)
  const offsetMilliseconds = tzParseTimezone(timeZone, date, true)
  const d = new Date(date.getTime() - offsetMilliseconds)
  const resultDate = /* @__PURE__ */ new Date(0)
  resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds())
  return resultDate
}
function formatInTimeZone(date, timeZone, formatStr, options) {
  options = {
    ...options,
    timeZone,
    originalDate: date
  }
  return format(toZonedTime(date, timeZone, { timeZone: options.timeZone }), formatStr, options)
}
const timePickerInjectionKey = createInjectionKey('n-time-picker')
const PanelCol = defineComponent({
  name: 'TimePickerPanelCol',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    activeValue: {
      type: [Number, String],
      default: null
    },
    // It should be required but vue's type seems to have bugs
    onItemClick: Function
  },
  render() {
    const { activeValue, onItemClick, clsPrefix } = this
    return this.data.map((item) => {
      const { label, disabled, value } = item
      const active = activeValue === value
      return h(
        'div',
        {
          key: label,
          'data-active': active ? '' : null,
          class: [
            `${clsPrefix}-time-picker-col__item`,
            active && `${clsPrefix}-time-picker-col__item--active`,
            disabled && `${clsPrefix}-time-picker-col__item--disabled`
          ],
          onClick:
            onItemClick && !disabled
              ? () => {
                  onItemClick(value)
                }
              : void 0
        },
        label
      )
    })
  }
})
const time = {
  amHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
  pmHours: ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
  hours: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ],
  minutes: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ],
  seconds: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ],
  period: ['AM', 'PM']
}
function getFixValue(value) {
  return `00${value}`.slice(-2)
}
function getTimeUnits(defaultValue, stepOrList, isHourWithAmPm) {
  if (Array.isArray(stepOrList)) {
    return (
      isHourWithAmPm === 'am'
        ? stepOrList.filter((v) => v < 12)
        : isHourWithAmPm === 'pm'
          ? stepOrList.filter((v) => v >= 12).map((v) => (v === 12 ? 12 : v - 12))
          : stepOrList
    ).map((v) => getFixValue(v))
  } else if (typeof stepOrList === 'number') {
    if (isHourWithAmPm === 'am') {
      return defaultValue.filter((hour) => {
        const hourAsNumber = Number(hour)
        return hourAsNumber < 12 && hourAsNumber % stepOrList === 0
      })
    } else if (isHourWithAmPm === 'pm') {
      return defaultValue
        .filter((hour) => {
          const hourAsNumber = Number(hour)
          return hourAsNumber >= 12 && hourAsNumber % stepOrList === 0
        })
        .map((hour) => {
          const hourAsNumber = Number(hour)
          return getFixValue(hourAsNumber === 12 ? 12 : hourAsNumber - 12)
        })
    }
    return defaultValue.filter((hour) => {
      return Number(hour) % stepOrList === 0
    })
  } else {
    return isHourWithAmPm === 'am'
      ? defaultValue.filter((hour) => Number(hour) < 12)
      : isHourWithAmPm === 'pm'
        ? defaultValue
            .map((hour) => Number(hour))
            .filter((hour) => Number(hour) >= 12)
            .map((v) => getFixValue(v === 12 ? 12 : v - 12))
        : defaultValue
  }
}
function isTimeInStep(value, type, stepOrList) {
  if (!stepOrList) {
    return true
  } else if (typeof stepOrList === 'number') {
    return value % stepOrList === 0
  } else {
    return stepOrList.includes(value)
  }
}
function findSimilarTime(value, type, stepOrList) {
  const list = getTimeUnits(time[type], stepOrList).map(Number)
  let lowerBound, upperBound
  for (let i = 0; i < list.length; ++i) {
    const v = list[i]
    if (v === value) {
      return v
    } else if (v > value) {
      upperBound = v
      break
    }
    lowerBound = v
  }
  if (lowerBound === void 0) {
    if (!upperBound) {
      throwError('time-picker', "Please set 'hours' or 'minutes' or 'seconds' props")
    }
    return upperBound
  }
  if (upperBound === void 0) {
    return lowerBound
  }
  return upperBound - value > value - lowerBound ? lowerBound : upperBound
}
function getAmPm(value) {
  return getHours(value) < 12 ? 'am' : 'pm'
}
const timePickerPanelProps = {
  actions: {
    type: Array,
    default: () => ['now', 'confirm']
  },
  showHour: {
    type: Boolean,
    default: true
  },
  showMinute: {
    type: Boolean,
    default: true
  },
  showSecond: {
    type: Boolean,
    default: true
  },
  showPeriod: {
    type: Boolean,
    default: true
  },
  isHourInvalid: Boolean,
  isMinuteInvalid: Boolean,
  isSecondInvalid: Boolean,
  isAmPmInvalid: Boolean,
  isValueInvalid: Boolean,
  hourValue: {
    type: Number,
    default: null
  },
  minuteValue: {
    type: Number,
    default: null
  },
  secondValue: {
    type: Number,
    default: null
  },
  amPmValue: {
    type: String,
    default: null
  },
  isHourDisabled: Function,
  isMinuteDisabled: Function,
  isSecondDisabled: Function,
  onHourClick: {
    type: Function,
    required: true
  },
  onMinuteClick: {
    type: Function,
    required: true
  },
  onSecondClick: {
    type: Function,
    required: true
  },
  onAmPmClick: {
    type: Function,
    required: true
  },
  onNowClick: Function,
  clearText: String,
  nowText: String,
  confirmText: String,
  transitionDisabled: Boolean,
  onClearClick: Function,
  onConfirmClick: Function,
  onFocusin: Function,
  onFocusout: Function,
  onFocusDetectorFocus: Function,
  onKeydown: Function,
  hours: [Number, Array],
  minutes: [Number, Array],
  seconds: [Number, Array],
  use12Hours: Boolean
}
const Panel = defineComponent({
  name: 'TimePickerPanel',
  props: timePickerPanelProps,
  setup(props) {
    const { mergedThemeRef, mergedClsPrefixRef } = inject(timePickerInjectionKey)
    const hoursRef = computed(() => {
      const { isHourDisabled, hours, use12Hours, amPmValue } = props
      if (!use12Hours) {
        return getTimeUnits(time.hours, hours).map((hour) => {
          return {
            label: hour,
            value: Number(hour),
            disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
          }
        })
      } else {
        const mergedAmPmValue =
          amPmValue !== null && amPmValue !== void 0 ? amPmValue : getAmPm(Date.now())
        return getTimeUnits(time.hours, hours, mergedAmPmValue).map((hour) => {
          const hourAs12FormattedNumber = Number(hour)
          const hourAs24FormattedNumber =
            mergedAmPmValue === 'pm' && hourAs12FormattedNumber !== 12
              ? hourAs12FormattedNumber + 12
              : hourAs12FormattedNumber
          return {
            label: hour,
            value: hourAs24FormattedNumber,
            disabled: isHourDisabled ? isHourDisabled(hourAs24FormattedNumber) : false
          }
        })
      }
    })
    const minutesRef = computed(() => {
      const { isMinuteDisabled, minutes } = props
      return getTimeUnits(time.minutes, minutes).map((minute) => {
        return {
          label: minute,
          value: Number(minute),
          disabled: isMinuteDisabled ? isMinuteDisabled(Number(minute), props.hourValue) : false
        }
      })
    })
    const secondsRef = computed(() => {
      const { isSecondDisabled, seconds } = props
      return getTimeUnits(time.seconds, seconds).map((second) => {
        return {
          label: second,
          value: Number(second),
          disabled: isSecondDisabled
            ? isSecondDisabled(Number(second), props.minuteValue, props.hourValue)
            : false
        }
      })
    })
    const amPmRef = computed(() => {
      const { isHourDisabled } = props
      let amDisabled = true
      let pmDisabled = true
      for (let i = 0; i < 12; ++i) {
        if (!(isHourDisabled === null || isHourDisabled === void 0 ? void 0 : isHourDisabled(i))) {
          amDisabled = false
          break
        }
      }
      for (let i = 12; i < 24; ++i) {
        if (!(isHourDisabled === null || isHourDisabled === void 0 ? void 0 : isHourDisabled(i))) {
          pmDisabled = false
          break
        }
      }
      return [
        {
          label: 'AM',
          value: 'am',
          disabled: amDisabled
        },
        {
          label: 'PM',
          value: 'pm',
          disabled: pmDisabled
        }
      ]
    })
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
      amPm: amPmRef,
      hourScrollRef: ref(null),
      minuteScrollRef: ref(null),
      secondScrollRef: ref(null),
      amPmScrollRef: ref(null)
    }
  },
  render() {
    var _a, _b, _c, _d
    const { mergedClsPrefix, mergedTheme } = this
    return h(
      'div',
      {
        tabindex: 0,
        class: `${mergedClsPrefix}-time-picker-panel`,
        onFocusin: this.onFocusin,
        onFocusout: this.onFocusout,
        onKeydown: this.onKeydown
      },
      h(
        'div',
        {
          class: `${mergedClsPrefix}-time-picker-cols`
        },
        this.showHour
          ? h(
              'div',
              {
                class: [
                  `${mergedClsPrefix}-time-picker-col`,
                  this.isHourInvalid && `${mergedClsPrefix}-time-picker-col--invalid`,
                  this.transitionDisabled &&
                    `${mergedClsPrefix}-time-picker-col--transition-disabled`
                ]
              },
              h(
                Scrollbar,
                {
                  ref: 'hourScrollRef',
                  theme: mergedTheme.peers.Scrollbar,
                  themeOverrides: mergedTheme.peerOverrides.Scrollbar
                },
                {
                  default: () => [
                    h(PanelCol, {
                      clsPrefix: mergedClsPrefix,
                      data: this.hours,
                      activeValue: this.hourValue,
                      onItemClick: this.onHourClick
                    }),
                    h('div', {
                      class: `${mergedClsPrefix}-time-picker-col__padding`
                    })
                  ]
                }
              )
            )
          : null,
        this.showMinute
          ? h(
              'div',
              {
                class: [
                  `${mergedClsPrefix}-time-picker-col`,
                  this.transitionDisabled &&
                    `${mergedClsPrefix}-time-picker-col--transition-disabled`,
                  this.isMinuteInvalid && `${mergedClsPrefix}-time-picker-col--invalid`
                ]
              },
              h(
                Scrollbar,
                {
                  ref: 'minuteScrollRef',
                  theme: mergedTheme.peers.Scrollbar,
                  themeOverrides: mergedTheme.peerOverrides.Scrollbar
                },
                {
                  default: () => [
                    h(PanelCol, {
                      clsPrefix: mergedClsPrefix,
                      data: this.minutes,
                      activeValue: this.minuteValue,
                      onItemClick: this.onMinuteClick
                    }),
                    h('div', {
                      class: `${mergedClsPrefix}-time-picker-col__padding`
                    })
                  ]
                }
              )
            )
          : null,
        this.showSecond
          ? h(
              'div',
              {
                class: [
                  `${mergedClsPrefix}-time-picker-col`,
                  this.isSecondInvalid && `${mergedClsPrefix}-time-picker-col--invalid`,
                  this.transitionDisabled &&
                    `${mergedClsPrefix}-time-picker-col--transition-disabled`
                ]
              },
              h(
                Scrollbar,
                {
                  ref: 'secondScrollRef',
                  theme: mergedTheme.peers.Scrollbar,
                  themeOverrides: mergedTheme.peerOverrides.Scrollbar
                },
                {
                  default: () => [
                    h(PanelCol, {
                      clsPrefix: mergedClsPrefix,
                      data: this.seconds,
                      activeValue: this.secondValue,
                      onItemClick: this.onSecondClick
                    }),
                    h('div', {
                      class: `${mergedClsPrefix}-time-picker-col__padding`
                    })
                  ]
                }
              )
            )
          : null,
        this.use12Hours
          ? h(
              'div',
              {
                class: [
                  `${mergedClsPrefix}-time-picker-col`,
                  this.isAmPmInvalid && `${mergedClsPrefix}-time-picker-col--invalid`,
                  this.transitionDisabled &&
                    `${mergedClsPrefix}-time-picker-col--transition-disabled`
                ]
              },
              h(
                Scrollbar,
                {
                  ref: 'amPmScrollRef',
                  theme: mergedTheme.peers.Scrollbar,
                  themeOverrides: mergedTheme.peerOverrides.Scrollbar
                },
                {
                  default: () => [
                    h(PanelCol, {
                      clsPrefix: mergedClsPrefix,
                      data: this.amPm,
                      activeValue: this.amPmValue,
                      onItemClick: this.onAmPmClick
                    }),
                    h('div', {
                      class: `${mergedClsPrefix}-time-picker-col__padding`
                    })
                  ]
                }
              )
            )
          : null
      ),
      ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length)
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-time-picker-actions`
            },
            ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
              ? h(
                  Button,
                  {
                    theme: mergedTheme.peers.Button,
                    themeOverrides: mergedTheme.peerOverrides.Button,
                    size: 'tiny',
                    onClick: this.onClearClick
                  },
                  {
                    default: () => this.clearText
                  }
                )
              : null,
            ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now'))
              ? h(
                  Button,
                  {
                    size: 'tiny',
                    theme: mergedTheme.peers.Button,
                    themeOverrides: mergedTheme.peerOverrides.Button,
                    onClick: this.onNowClick
                  },
                  {
                    default: () => this.nowText
                  }
                )
              : null,
            ((_d = this.actions) === null || _d === void 0 ? void 0 : _d.includes('confirm'))
              ? h(
                  Button,
                  {
                    size: 'tiny',
                    type: 'primary',
                    class: `${mergedClsPrefix}-time-picker-actions__confirm`,
                    theme: mergedTheme.peers.Button,
                    themeOverrides: mergedTheme.peerOverrides.Button,
                    disabled: this.isValueInvalid,
                    onClick: this.onConfirmClick
                  },
                  {
                    default: () => this.confirmText
                  }
                )
              : null
          )
        : null,
      h(FocusDetector, {
        onFocus: this.onFocusDetectorFocus
      })
    )
  }
})
const style$1 = c([
  cB(
    'time-picker',
    `
 z-index: auto;
 position: relative;
 `,
    [
      cB(
        'time-picker-icon',
        `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `
      ),
      cM('disabled', [
        cB(
          'time-picker-icon',
          `
 color: var(--n-icon-color-disabled-override);
 `
        )
      ])
    ]
  ),
  cB(
    'time-picker-panel',
    `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 font-size: var(--n-item-font-size);
 border-radius: var(--n-border-radius);
 margin: 4px 0;
 min-width: 104px;
 overflow: hidden;
 background-color: var(--n-panel-color);
 box-shadow: var(--n-panel-box-shadow);
 `,
    [
      fadeInScaleUpTransition(),
      cB(
        'time-picker-actions',
        `
 padding: var(--n-panel-action-padding);
 align-items: center;
 display: flex;
 justify-content: space-evenly;
 `
      ),
      cB(
        'time-picker-cols',
        `
 height: calc(var(--n-item-height) * 6);
 display: flex;
 position: relative;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-panel-divider-color);
 `
      ),
      cB(
        'time-picker-col',
        `
 flex-grow: 1;
 min-width: var(--n-item-width);
 height: calc(var(--n-item-height) * 6);
 flex-direction: column;
 transition: box-shadow .3s var(--n-bezier);
 `,
        [
          cM('transition-disabled', [
            cE('item', 'transition: none;', [c('&::before', 'transition: none;')])
          ]),
          cE(
            'padding',
            `
 height: calc(var(--n-item-height) * 5);
 `
          ),
          c('&:first-child', 'min-width: calc(var(--n-item-width) + 4px);', [
            cE('item', [c('&::before', 'left: 4px;')])
          ]),
          cE(
            'item',
            `
 cursor: pointer;
 height: var(--n-item-height);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 background: #0000;
 text-decoration-color: #0000;
 color: var(--n-item-text-color);
 z-index: 0;
 box-sizing: border-box;
 padding-top: 4px;
 position: relative;
 `,
            [
              c(
                '&::before',
                `
 content: "";
 transition: background-color .3s var(--n-bezier);
 z-index: -1;
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-item-border-radius);
 `
              ),
              cNotM('disabled', [
                c(
                  '&:hover::before',
                  `
 background-color: var(--n-item-color-hover);
 `
                )
              ]),
              cM(
                'active',
                `
 color: var(--n-item-text-color-active);
 `,
                [
                  c(
                    '&::before',
                    `
 background-color: var(--n-item-color-hover);
 `
                  )
                ]
              ),
              cM(
                'disabled',
                `
 opacity: var(--n-item-opacity-disabled);
 cursor: not-allowed;
 `
              )
            ]
          ),
          cM('invalid', [
            cE('item', [
              cM(
                'active',
                `
 text-decoration: line-through;
 text-decoration-color: var(--n-item-text-color-active);
 `
              )
            ])
          ])
        ]
      )
    ]
  )
])
function validateUnits(value, max) {
  if (value === void 0) {
    return true
  }
  if (Array.isArray(value)) {
    return value.every((v) => v >= 0 && v <= max)
  } else {
    return value >= 0 && value <= max
  }
}
const timePickerProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean,
    default: void 0
  },
  actions: Array,
  defaultValue: {
    type: Number,
    default: null
  },
  defaultFormattedValue: String,
  placeholder: String,
  placement: {
    type: String,
    default: 'bottom-start'
  },
  value: Number,
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  valueFormat: String,
  formattedValue: String,
  isHourDisabled: Function,
  size: String,
  isMinuteDisabled: Function,
  isSecondDisabled: Function,
  inputReadonly: Boolean,
  clearable: Boolean,
  status: String,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  onUpdateFormattedValue: [Function, Array],
  'onUpdate:formattedValue': [Function, Array],
  onBlur: [Function, Array],
  onConfirm: [Function, Array],
  onClear: Function,
  onFocus: [Function, Array],
  // https://www.iana.org/time-zones
  timeZone: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  show: {
    type: Boolean,
    default: void 0
  },
  hours: {
    type: [Number, Array],
    validator: (value) => validateUnits(value, 23)
  },
  minutes: {
    type: [Number, Array],
    validator: (value) => validateUnits(value, 59)
  },
  seconds: {
    type: [Number, Array],
    validator: (value) => validateUnits(value, 59)
  },
  use12Hours: Boolean,
  // private
  stateful: {
    type: Boolean,
    default: true
  },
  // deprecated
  onChange: [Function, Array]
})
const NTimePicker = defineComponent({
  name: 'TimePicker',
  props: timePickerProps,
  setup(props) {
    const { mergedBorderedRef, mergedClsPrefixRef, namespaceRef, inlineThemeDisabled } =
      useConfig(props)
    const { localeRef, dateLocaleRef } = useLocale('TimePicker')
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
    const themeRef = useTheme(
      'TimePicker',
      '-time-picker',
      style$1,
      timePickerLight,
      props,
      mergedClsPrefixRef
    )
    const keyboardState = useKeyboard()
    const inputInstRef = ref(null)
    const panelInstRef = ref(null)
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      }
    })
    function getTimestampFromFormattedValue(value) {
      if (value === null) return null
      return strictParse(
        value,
        props.valueFormat || props.format,
        /* @__PURE__ */ new Date(),
        dateFnsOptionsRef.value
      ).getTime()
    }
    const { defaultValue, defaultFormattedValue } = props
    const uncontrolledValueRef = ref(
      defaultFormattedValue !== void 0
        ? getTimestampFromFormattedValue(defaultFormattedValue)
        : defaultValue
    )
    const mergedValueRef = computed(() => {
      const { formattedValue } = props
      if (formattedValue !== void 0) {
        return getTimestampFromFormattedValue(formattedValue)
      }
      const { value } = props
      if (value !== void 0) {
        return value
      }
      return uncontrolledValueRef.value
    })
    const mergedFormatRef = computed(() => {
      const { timeZone } = props
      if (timeZone) {
        return (date, format2, options) => {
          return formatInTimeZone(date, timeZone, format2, options)
        }
      } else {
        return (date, _format, options) => {
          return format$1(date, _format, options)
        }
      }
    })
    const displayTimeStringRef = ref('')
    watch(
      () => props.timeZone,
      () => {
        const mergedValue = mergedValueRef.value
        displayTimeStringRef.value =
          mergedValue === null
            ? ''
            : mergedFormatRef.value(mergedValue, props.format, dateFnsOptionsRef.value)
      },
      {
        immediate: true
      }
    )
    const uncontrolledShowRef = ref(false)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const memorizedValueRef = ref(mergedValueRef.value)
    const transitionDisabledRef = ref(false)
    const localizedClearRef = computed(() => {
      return localeRef.value.clear
    })
    const localizedNowRef = computed(() => {
      return localeRef.value.now
    })
    const localizedPlaceholderRef = computed(() => {
      if (props.placeholder !== void 0) return props.placeholder
      return localeRef.value.placeholder
    })
    const localizedNegativeTextRef = computed(() => {
      return localeRef.value.negativeText
    })
    const localizedPositiveTextRef = computed(() => {
      return localeRef.value.positiveText
    })
    const hourInFormatRef = computed(() => {
      return /H|h|K|k/.test(props.format)
    })
    const minuteInFormatRef = computed(() => {
      return props.format.includes('m')
    })
    const secondInFormatRef = computed(() => {
      return props.format.includes('s')
    })
    const hourValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(mergedFormatRef.value(value, 'HH', dateFnsOptionsRef.value))
    })
    const minuteValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(mergedFormatRef.value(value, 'mm', dateFnsOptionsRef.value))
    })
    const secondValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(mergedFormatRef.value(value, 'ss', dateFnsOptionsRef.value))
    })
    const isHourInvalidRef = computed(() => {
      const { isHourDisabled } = props
      if (hourValueRef.value === null) return false
      if (!isTimeInStep(hourValueRef.value, 'hours', props.hours)) return true
      if (!isHourDisabled) return false
      return isHourDisabled(hourValueRef.value)
    })
    const isMinuteInvalidRef = computed(() => {
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      if (minuteValue === null || hourValue === null) return false
      if (!isTimeInStep(minuteValue, 'minutes', props.minutes)) return true
      const { isMinuteDisabled } = props
      if (!isMinuteDisabled) return false
      return isMinuteDisabled(minuteValue, hourValue)
    })
    const isSecondInvalidRef = computed(() => {
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      const { value: secondValue } = secondValueRef
      if (secondValue === null || minuteValue === null || hourValue === null) {
        return false
      }
      if (!isTimeInStep(secondValue, 'seconds', props.seconds)) return true
      const { isSecondDisabled } = props
      if (!isSecondDisabled) return false
      return isSecondDisabled(secondValue, minuteValue, hourValue)
    })
    const isValueInvalidRef = computed(() => {
      return isHourInvalidRef.value || isMinuteInvalidRef.value || isSecondInvalidRef.value
    })
    const mergedAttrSizeRef = computed(() => {
      return props.format.length + 4
    })
    const amPmValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return getHours(value) < 12 ? 'am' : 'pm'
    })
    function doUpdateFormattedValue(value, timestampValue) {
      const { onUpdateFormattedValue, 'onUpdate:formattedValue': _onUpdateFormattedValue } = props
      if (onUpdateFormattedValue) {
        call(onUpdateFormattedValue, value, timestampValue)
      }
      if (_onUpdateFormattedValue) {
        call(_onUpdateFormattedValue, value, timestampValue)
      }
    }
    function createFormattedValue(value) {
      return value === null ? null : mergedFormatRef.value(value, props.valueFormat || props.format)
    }
    function doUpdateValue(value) {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onChange } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      const formattedValue = createFormattedValue(value)
      if (onUpdateValue) {
        call(onUpdateValue, value, formattedValue)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, formattedValue)
      }
      if (onChange) call(onChange, value, formattedValue)
      doUpdateFormattedValue(formattedValue, value)
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doFocus(e) {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    }
    function doBlur(e) {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doConfirm() {
      const { onConfirm } = props
      if (onConfirm) {
        call(onConfirm, mergedValueRef.value, createFormattedValue(mergedValueRef.value))
      }
    }
    function handleTimeInputClear(e) {
      var _a
      e.stopPropagation()
      doUpdateValue(null)
      deriveInputValue(null)
      ;(_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props)
    }
    function handleFocusDetectorFocus() {
      closePanel({
        returnFocus: true
      })
    }
    function clearSelectedValue() {
      doUpdateValue(null)
      deriveInputValue(null)
      closePanel({
        returnFocus: true
      })
    }
    function handleInputKeydown(e) {
      if (e.key === 'Escape' && mergedShowRef.value) {
        markEventEffectPerformed(e)
      }
    }
    function handleMenuKeydown(e) {
      var _a
      switch (e.key) {
        case 'Escape':
          if (mergedShowRef.value) {
            markEventEffectPerformed(e)
            closePanel({
              returnFocus: true
            })
          }
          break
        case 'Tab':
          if (
            keyboardState.shift &&
            e.target === ((_a = panelInstRef.value) === null || _a === void 0 ? void 0 : _a.$el)
          ) {
            e.preventDefault()
            closePanel({
              returnFocus: true
            })
          }
          break
      }
    }
    function disableTransitionOneTick() {
      transitionDisabledRef.value = true
      void nextTick(() => {
        transitionDisabledRef.value = false
      })
    }
    function handleTriggerClick(e) {
      if (mergedDisabledRef.value || happensIn(e, 'clear')) return
      if (!mergedShowRef.value) {
        openPanel()
      }
    }
    function handleHourClick(hour) {
      if (typeof hour === 'string') return
      if (mergedValueRef.value === null) {
        doUpdateValue(getTime(setHours(startOfHour(/* @__PURE__ */ new Date()), hour)))
      } else {
        doUpdateValue(getTime(setHours(mergedValueRef.value, hour)))
      }
    }
    function handleMinuteClick(minute) {
      if (typeof minute === 'string') return
      if (mergedValueRef.value === null) {
        doUpdateValue(getTime(setMinutes(startOfMinute(/* @__PURE__ */ new Date()), minute)))
      } else {
        doUpdateValue(getTime(setMinutes(mergedValueRef.value, minute)))
      }
    }
    function handleSecondClick(second) {
      if (typeof second === 'string') return
      if (mergedValueRef.value === null) {
        doUpdateValue(getTime(setSeconds(startOfSecond(/* @__PURE__ */ new Date()), second)))
      } else {
        doUpdateValue(getTime(setSeconds(mergedValueRef.value, second)))
      }
    }
    function handleAmPmClick(amPm) {
      const { value: mergedValue } = mergedValueRef
      if (mergedValue === null) {
        const now = /* @__PURE__ */ new Date()
        const hours = getHours(now)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue(getTime(setHours(now, hours + 12)))
        } else if (amPm === 'am' && hours >= 12) {
          doUpdateValue(getTime(setHours(now, hours - 12)))
        }
        doUpdateValue(getTime(now))
      } else {
        const hours = getHours(mergedValue)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue(getTime(setHours(mergedValue, hours + 12)))
        } else if (amPm === 'am' && hours >= 12) {
          doUpdateValue(getTime(setHours(mergedValue, hours - 12)))
        }
      }
    }
    function deriveInputValue(time2) {
      if (time2 === void 0) time2 = mergedValueRef.value
      if (time2 === null) {
        displayTimeStringRef.value = ''
      } else {
        displayTimeStringRef.value = mergedFormatRef.value(
          time2,
          props.format,
          dateFnsOptionsRef.value
        )
      }
    }
    function handleTimeInputFocus(e) {
      if (isInternalFocusSwitch(e)) return
      doFocus(e)
    }
    function handleTimeInputBlur(e) {
      var _a
      if (isInternalFocusSwitch(e)) return
      if (mergedShowRef.value) {
        const panelEl = (_a = panelInstRef.value) === null || _a === void 0 ? void 0 : _a.$el
        if (
          !(panelEl === null || panelEl === void 0 ? void 0 : panelEl.contains(e.relatedTarget))
        ) {
          deriveInputValue()
          doBlur(e)
          closePanel({
            returnFocus: false
          })
        }
      } else {
        deriveInputValue()
        doBlur(e)
      }
    }
    function handleTimeInputActivate() {
      if (mergedDisabledRef.value) return
      if (!mergedShowRef.value) {
        openPanel()
      }
    }
    function handleTimeInputDeactivate() {
      if (mergedDisabledRef.value) return
      deriveInputValue()
      closePanel({
        returnFocus: false
      })
    }
    function scrollTimer() {
      if (!panelInstRef.value) return
      const { hourScrollRef, minuteScrollRef, secondScrollRef, amPmScrollRef } = panelInstRef.value
      ;[hourScrollRef, minuteScrollRef, secondScrollRef, amPmScrollRef].forEach((itemScrollRef) => {
        var _a
        if (!itemScrollRef) return
        const activeItemEl =
          (_a = itemScrollRef.contentRef) === null || _a === void 0
            ? void 0
            : _a.querySelector('[data-active]')
        if (activeItemEl) {
          itemScrollRef.scrollTo({
            top: activeItemEl.offsetTop
          })
        }
      })
    }
    function doUpdateShow(value) {
      uncontrolledShowRef.value = value
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      if (_onUpdateShow) call(_onUpdateShow, value)
    }
    function isInternalFocusSwitch(e) {
      var _a, _b, _c
      return !!(
        ((_b = (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.wrapperElRef) ===
          null || _b === void 0
          ? void 0
          : _b.contains(e.relatedTarget)) ||
        ((_c = panelInstRef.value) === null || _c === void 0
          ? void 0
          : _c.$el.contains(e.relatedTarget))
      )
    }
    function openPanel() {
      memorizedValueRef.value = mergedValueRef.value
      doUpdateShow(true)
      void nextTick(scrollTimer)
    }
    function handleClickOutside(e) {
      var _a, _b
      if (
        mergedShowRef.value &&
        !((_b = (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.wrapperElRef) ===
          null || _b === void 0
          ? void 0
          : _b.contains(getPreciseEventTarget(e)))
      ) {
        closePanel({
          returnFocus: false
        })
      }
    }
    function closePanel({ returnFocus }) {
      var _a
      if (mergedShowRef.value) {
        doUpdateShow(false)
        if (returnFocus) {
          ;(_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus()
        }
      }
    }
    function handleTimeInputUpdateValue(v) {
      if (v === '') {
        doUpdateValue(null)
        return
      }
      const time2 = strictParse(
        v,
        props.format,
        /* @__PURE__ */ new Date(),
        dateFnsOptionsRef.value
      )
      displayTimeStringRef.value = v
      if (isValid(time2)) {
        const { value: mergedValue } = mergedValueRef
        if (mergedValue !== null) {
          const newTime = set(mergedValue, {
            hours: getHours(time2),
            minutes: getMinutes(time2),
            seconds: getSeconds(time2),
            milliseconds: getMilliseconds(time2)
          })
          doUpdateValue(getTime(newTime))
        } else {
          doUpdateValue(getTime(time2))
        }
      }
    }
    function handleCancelClick() {
      doUpdateValue(memorizedValueRef.value)
      doUpdateShow(false)
    }
    function handleNowClick() {
      const now = /* @__PURE__ */ new Date()
      const getNowTime = {
        hours: getHours,
        minutes: getMinutes,
        seconds: getSeconds
      }
      const [mergeHours, mergeMinutes, mergeSeconds] = ['hours', 'minutes', 'seconds'].map((i) =>
        !props[i] || isTimeInStep(getNowTime[i](now), i, props[i])
          ? getNowTime[i](now)
          : findSimilarTime(getNowTime[i](now), i, props[i])
      )
      const newValue = setSeconds(
        setMinutes(
          setHours(mergedValueRef.value ? mergedValueRef.value : getTime(now), mergeHours),
          mergeMinutes
        ),
        mergeSeconds
      )
      doUpdateValue(getTime(newValue))
    }
    function handleConfirmClick() {
      deriveInputValue()
      doConfirm()
      closePanel({
        returnFocus: true
      })
    }
    function handleMenuFocusOut(e) {
      if (isInternalFocusSwitch(e)) return
      deriveInputValue()
      doBlur(e)
      closePanel({
        returnFocus: false
      })
    }
    watch(mergedValueRef, (value) => {
      deriveInputValue(value)
      disableTransitionOneTick()
      void nextTick(scrollTimer)
    })
    watch(mergedShowRef, () => {
      if (isValueInvalidRef.value) {
        doUpdateValue(memorizedValueRef.value)
      }
    })
    provide(timePickerInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef
    })
    const exposedMethods = {
      focus: () => {
        var _a
        ;(_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus()
      },
      blur: () => {
        var _a
        ;(_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.blur()
      }
    }
    const triggerCssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { iconColor, iconColorDisabled }
      } = themeRef.value
      return {
        '--n-icon-color-override': iconColor,
        '--n-icon-color-disabled-override': iconColorDisabled,
        '--n-bezier': cubicBezierEaseInOut
      }
    })
    const triggerThemeClassHandle = inlineThemeDisabled
      ? useThemeClass('time-picker-trigger', void 0, triggerCssVarsRef, props)
      : void 0
    const cssVarsRef = computed(() => {
      const {
        self: {
          panelColor,
          itemTextColor,
          itemTextColorActive,
          itemColorHover,
          panelDividerColor,
          panelBoxShadow,
          itemOpacityDisabled,
          borderRadius,
          itemFontSize,
          itemWidth,
          itemHeight,
          panelActionPadding,
          itemBorderRadius
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-item-color-hover': itemColorHover,
        '--n-item-font-size': itemFontSize,
        '--n-item-height': itemHeight,
        '--n-item-opacity-disabled': itemOpacityDisabled,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-active': itemTextColorActive,
        '--n-item-width': itemWidth,
        '--n-panel-action-padding': panelActionPadding,
        '--n-panel-box-shadow': panelBoxShadow,
        '--n-panel-color': panelColor,
        '--n-panel-divider-color': panelDividerColor,
        '--n-item-border-radius': itemBorderRadius
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('time-picker', void 0, cssVarsRef, props)
      : void 0
    return {
      focus: exposedMethods.focus,
      blur: exposedMethods.blur,
      mergedStatus: mergedStatusRef,
      mergedBordered: mergedBorderedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: isMounted(),
      inputInstRef,
      panelInstRef,
      adjustedTo: useAdjustedTo(props),
      mergedShow: mergedShowRef,
      localizedClear: localizedClearRef,
      localizedNow: localizedNowRef,
      localizedPlaceholder: localizedPlaceholderRef,
      localizedNegativeText: localizedNegativeTextRef,
      localizedPositiveText: localizedPositiveTextRef,
      hourInFormat: hourInFormatRef,
      minuteInFormat: minuteInFormatRef,
      secondInFormat: secondInFormatRef,
      mergedAttrSize: mergedAttrSizeRef,
      displayTimeString: displayTimeStringRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      isValueInvalid: isValueInvalidRef,
      isHourInvalid: isHourInvalidRef,
      isMinuteInvalid: isMinuteInvalidRef,
      isSecondInvalid: isSecondInvalidRef,
      transitionDisabled: transitionDisabledRef,
      hourValue: hourValueRef,
      minuteValue: minuteValueRef,
      secondValue: secondValueRef,
      amPmValue: amPmValueRef,
      handleInputKeydown,
      handleTimeInputFocus,
      handleTimeInputBlur,
      handleNowClick,
      handleConfirmClick,
      handleTimeInputUpdateValue,
      handleMenuFocusOut,
      handleCancelClick,
      handleClickOutside,
      handleTimeInputActivate,
      handleTimeInputDeactivate,
      handleHourClick,
      handleMinuteClick,
      handleSecondClick,
      handleAmPmClick,
      handleTimeInputClear,
      handleFocusDetectorFocus,
      handleMenuKeydown,
      handleTriggerClick,
      mergedTheme: themeRef,
      triggerCssVars: inlineThemeDisabled ? void 0 : triggerCssVarsRef,
      triggerThemeClass:
        triggerThemeClassHandle === null || triggerThemeClassHandle === void 0
          ? void 0
          : triggerThemeClassHandle.themeClass,
      triggerOnRender:
        triggerThemeClassHandle === null || triggerThemeClassHandle === void 0
          ? void 0
          : triggerThemeClassHandle.onRender,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.themeClass,
      onRender:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.onRender,
      clearSelectedValue
    }
  },
  render() {
    const { mergedClsPrefix, $slots, triggerOnRender } = this
    triggerOnRender === null || triggerOnRender === void 0 ? void 0 : triggerOnRender()
    return h(
      'div',
      {
        class: [`${mergedClsPrefix}-time-picker`, this.triggerThemeClass],
        style: this.triggerCssVars
      },
      h(Binder, null, {
        default: () => [
          h(VTarget, null, {
            default: () =>
              h(
                __unplugin_components_1,
                {
                  ref: 'inputInstRef',
                  status: this.mergedStatus,
                  value: this.displayTimeString,
                  bordered: this.mergedBordered,
                  passivelyActivated: true,
                  attrSize: this.mergedAttrSize,
                  theme: this.mergedTheme.peers.Input,
                  themeOverrides: this.mergedTheme.peerOverrides.Input,
                  stateful: this.stateful,
                  size: this.mergedSize,
                  placeholder: this.localizedPlaceholder,
                  clearable: this.clearable,
                  disabled: this.mergedDisabled,
                  textDecoration: this.isValueInvalid ? 'line-through' : void 0,
                  onFocus: this.handleTimeInputFocus,
                  onBlur: this.handleTimeInputBlur,
                  onActivate: this.handleTimeInputActivate,
                  onDeactivate: this.handleTimeInputDeactivate,
                  onUpdateValue: this.handleTimeInputUpdateValue,
                  onClear: this.handleTimeInputClear,
                  internalDeactivateOnEnter: true,
                  internalForceFocus: this.mergedShow,
                  readonly: this.inputReadonly || this.mergedDisabled,
                  onClick: this.handleTriggerClick,
                  onKeydown: this.handleInputKeydown
                },
                this.showIcon
                  ? {
                      [this.clearable ? 'clear-icon-placeholder' : 'suffix']: () =>
                        h(
                          NBaseIcon,
                          {
                            clsPrefix: mergedClsPrefix,
                            class: `${mergedClsPrefix}-time-picker-icon`
                          },
                          {
                            default: () => ($slots.icon ? $slots.icon() : h(TimeIcon, null))
                          }
                        )
                    }
                  : null
              )
          }),
          h(
            VFollower,
            {
              teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
              show: this.mergedShow,
              to: this.adjustedTo,
              containerClass: this.namespace,
              placement: this.placement
            },
            {
              default: () =>
                h(
                  Transition,
                  {
                    name: 'fade-in-scale-up-transition',
                    appear: this.isMounted
                  },
                  {
                    default: () => {
                      var _a
                      if (this.mergedShow) {
                        ;(_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this)
                        return withDirectives(
                          h(Panel, {
                            ref: 'panelInstRef',
                            actions: this.actions,
                            class: this.themeClass,
                            style: this.cssVars,
                            seconds: this.seconds,
                            minutes: this.minutes,
                            hours: this.hours,
                            transitionDisabled: this.transitionDisabled,
                            hourValue: this.hourValue,
                            showHour: this.hourInFormat,
                            isHourInvalid: this.isHourInvalid,
                            isHourDisabled: this.isHourDisabled,
                            minuteValue: this.minuteValue,
                            showMinute: this.minuteInFormat,
                            isMinuteInvalid: this.isMinuteInvalid,
                            isMinuteDisabled: this.isMinuteDisabled,
                            secondValue: this.secondValue,
                            amPmValue: this.amPmValue,
                            showSecond: this.secondInFormat,
                            isSecondInvalid: this.isSecondInvalid,
                            isSecondDisabled: this.isSecondDisabled,
                            isValueInvalid: this.isValueInvalid,
                            clearText: this.localizedClear,
                            nowText: this.localizedNow,
                            confirmText: this.localizedPositiveText,
                            use12Hours: this.use12Hours,
                            onFocusout: this.handleMenuFocusOut,
                            onKeydown: this.handleMenuKeydown,
                            onHourClick: this.handleHourClick,
                            onMinuteClick: this.handleMinuteClick,
                            onSecondClick: this.handleSecondClick,
                            onAmPmClick: this.handleAmPmClick,
                            onNowClick: this.handleNowClick,
                            onConfirmClick: this.handleConfirmClick,
                            onClearClick: this.clearSelectedValue,
                            onFocusDetectorFocus: this.handleFocusDetectorFocus
                          }),
                          [
                            [
                              clickoutside,
                              this.handleClickOutside,
                              void 0,
                              {
                                capture: true
                              }
                            ]
                          ]
                        )
                      }
                      return null
                    }
                  }
                )
            }
          )
        ]
      })
    )
  }
})
const DatetimePanel = defineComponent({
  name: 'DateTimePanel',
  props: useCalendarProps,
  setup(props) {
    return useCalendar(props, 'datetime')
  },
  render() {
    var _a, _b, _c, _d
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      timePickerProps: timePickerProps2,
      datePickerSlots,
      onRender
    } = this
    onRender === null || onRender === void 0 ? void 0 : onRender()
    return h(
      'div',
      {
        ref: 'selfRef',
        tabindex: 0,
        class: [
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--datetime`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ],
        onKeydown: this.handlePanelKeyDown,
        onFocus: this.handlePanelFocus
      },
      h(
        'div',
        {
          class: `${mergedClsPrefix}-date-panel-header`
        },
        h(__unplugin_components_1, {
          value: this.dateInputValue,
          theme: mergedTheme.peers.Input,
          themeOverrides: mergedTheme.peerOverrides.Input,
          stateful: false,
          size: this.timePickerSize,
          readonly: this.inputReadonly,
          class: `${mergedClsPrefix}-date-panel-date-input`,
          textDecoration: this.isDateInvalid ? 'line-through' : '',
          placeholder: this.locale.selectDate,
          onBlur: this.handleDateInputBlur,
          onUpdateValue: this.handleDateInput
        }),
        h(
          NTimePicker,
          Object.assign(
            {
              size: this.timePickerSize,
              placeholder: this.locale.selectTime,
              format: this.timePickerFormat
            },
            Array.isArray(timePickerProps2) ? void 0 : timePickerProps2,
            {
              showIcon: false,
              to: false,
              theme: mergedTheme.peers.TimePicker,
              themeOverrides: mergedTheme.peerOverrides.TimePicker,
              value: Array.isArray(this.value) ? null : this.value,
              isHourDisabled: this.isHourDisabled,
              isMinuteDisabled: this.isMinuteDisabled,
              isSecondDisabled: this.isSecondDisabled,
              onUpdateValue: this.handleTimePickerChange,
              stateful: false
            }
          )
        )
      ),
      h(
        'div',
        {
          class: `${mergedClsPrefix}-date-panel-calendar`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month`
          },
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-prev`,
              onClick: this.prevYear
            },
            resolveSlot(datePickerSlots['prev-year'], () => [h(FastBackwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__prev`,
              onClick: this.prevMonth
            },
            resolveSlot(datePickerSlots['prev-month'], () => [h(BackwardIcon, null)])
          ),
          h(PanelHeader, {
            monthYearSeparator: this.calendarHeaderMonthYearSeparator,
            monthBeforeYear: this.calendarMonthBeforeYear,
            value: this.calendarValue,
            onUpdateValue: this.onUpdateCalendarValue,
            mergedClsPrefix,
            calendarMonth: this.calendarMonth,
            calendarYear: this.calendarYear
          }),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__next`,
              onClick: this.nextMonth
            },
            resolveSlot(datePickerSlots['next-month'], () => [h(ForwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-next`,
              onClick: this.nextYear
            },
            resolveSlot(datePickerSlots['next-year'], () => [h(FastForwardIcon, null)])
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-weekdays`
          },
          this.weekdays.map((weekday) =>
            h(
              'div',
              {
                key: weekday,
                class: `${mergedClsPrefix}-date-panel-weekdays__day`
              },
              weekday
            )
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-dates`
          },
          this.dateArray.map((dateItem2, i) =>
            h(
              'div',
              {
                'data-n-date': true,
                key: i,
                class: [
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem2.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem2.selected,
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem2.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem2.ts,
                      {
                        type: 'date',
                        year: dateItem2.dateObject.year,
                        month: dateItem2.dateObject.month,
                        date: dateItem2.dateObject.date
                      }
                    )
                  }
                ],
                onClick: () => {
                  this.handleDateClick(dateItem2)
                }
              },
              h('div', {
                class: `${mergedClsPrefix}-date-panel-date__trigger`
              }),
              dateItem2.dateObject.date,
              dateItem2.isCurrentDate
                ? h('div', {
                    class: `${mergedClsPrefix}-date-panel-date__sup`
                  })
                : null
            )
          )
        )
      ),
      this.datePickerSlots.footer
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-footer`
            },
            this.datePickerSlots.footer()
          )
        : null,
      ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-actions`
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__prefix`
              },
              shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut)
                    ? null
                    : h(
                        XButton,
                        {
                          size: 'tiny',
                          onMouseenter: () => {
                            this.handleSingleShortcutMouseenter(shortcut)
                          },
                          onClick: () => {
                            this.handleSingleShortcutClick(shortcut)
                          },
                          onMouseleave: () => {
                            this.handleShortcutMouseleave()
                          }
                        },
                        {
                          default: () => key
                        }
                      )
                })
            ),
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__suffix`
              },
              ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                ? resolveSlotWithTypedProps(
                    this.datePickerSlots.clear,
                    {
                      onClear: this.clearSelectedDateTime,
                      text: this.locale.clear
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.clearSelectedDateTime
                        },
                        {
                          default: () => this.locale.clear
                        }
                      )
                    ]
                  )
                : null,
              ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now'))
                ? resolveSlotWithTypedProps(
                    datePickerSlots.now,
                    {
                      onNow: this.handleNowClick,
                      text: this.locale.now
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleNowClick
                        },
                        {
                          default: () => this.locale.now
                        }
                      )
                    ]
                  )
                : null,
              ((_d = this.actions) === null || _d === void 0 ? void 0 : _d.includes('confirm'))
                ? resolveSlotWithTypedProps(
                    datePickerSlots.confirm,
                    {
                      onConfirm: this.handleConfirmClick,
                      disabled: this.isDateInvalid,
                      text: this.locale.confirm
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          type: 'primary',
                          disabled: this.isDateInvalid,
                          onClick: this.handleConfirmClick
                        },
                        {
                          default: () => this.locale.confirm
                        }
                      )
                    ]
                  )
                : null
            )
          )
        : null,
      h(FocusDetector, {
        onFocus: this.handleFocusDetectorFocus
      })
    )
  }
})
const DatetimerangePanel = defineComponent({
  name: 'DateTimeRangePanel',
  props: useDualCalendarProps,
  setup(props) {
    return useDualCalendar(props, 'datetimerange')
  },
  render() {
    var _a, _b, _c
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      timePickerProps: timePickerProps2,
      onRender,
      datePickerSlots
    } = this
    onRender === null || onRender === void 0 ? void 0 : onRender()
    return h(
      'div',
      {
        ref: 'selfRef',
        tabindex: 0,
        class: [
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--datetimerange`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ],
        onKeydown: this.handlePanelKeyDown,
        onFocus: this.handlePanelFocus
      },
      h(
        'div',
        {
          class: `${mergedClsPrefix}-date-panel-header`
        },
        h(__unplugin_components_1, {
          value: this.startDateDisplayString,
          theme: mergedTheme.peers.Input,
          themeOverrides: mergedTheme.peerOverrides.Input,
          size: this.timePickerSize,
          stateful: false,
          readonly: this.inputReadonly,
          class: `${mergedClsPrefix}-date-panel-date-input`,
          textDecoration: this.isStartValueInvalid ? 'line-through' : '',
          placeholder: this.locale.selectDate,
          onBlur: this.handleStartDateInputBlur,
          onUpdateValue: this.handleStartDateInput
        }),
        h(
          NTimePicker,
          Object.assign(
            {
              placeholder: this.locale.selectTime,
              format: this.timePickerFormat,
              size: this.timePickerSize
            },
            Array.isArray(timePickerProps2) ? timePickerProps2[0] : timePickerProps2,
            {
              value: this.startTimeValue,
              to: false,
              showIcon: false,
              disabled: this.isSelecting,
              theme: mergedTheme.peers.TimePicker,
              themeOverrides: mergedTheme.peerOverrides.TimePicker,
              stateful: false,
              isHourDisabled: this.isStartHourDisabled,
              isMinuteDisabled: this.isStartMinuteDisabled,
              isSecondDisabled: this.isStartSecondDisabled,
              onUpdateValue: this.handleStartTimePickerChange
            }
          )
        ),
        h(__unplugin_components_1, {
          value: this.endDateInput,
          theme: mergedTheme.peers.Input,
          themeOverrides: mergedTheme.peerOverrides.Input,
          stateful: false,
          size: this.timePickerSize,
          readonly: this.inputReadonly,
          class: `${mergedClsPrefix}-date-panel-date-input`,
          textDecoration: this.isEndValueInvalid ? 'line-through' : '',
          placeholder: this.locale.selectDate,
          onBlur: this.handleEndDateInputBlur,
          onUpdateValue: this.handleEndDateInput
        }),
        h(
          NTimePicker,
          Object.assign(
            {
              placeholder: this.locale.selectTime,
              format: this.timePickerFormat,
              size: this.timePickerSize
            },
            Array.isArray(timePickerProps2) ? timePickerProps2[1] : timePickerProps2,
            {
              disabled: this.isSelecting,
              showIcon: false,
              theme: mergedTheme.peers.TimePicker,
              themeOverrides: mergedTheme.peerOverrides.TimePicker,
              to: false,
              stateful: false,
              value: this.endTimeValue,
              isHourDisabled: this.isEndHourDisabled,
              isMinuteDisabled: this.isEndMinuteDisabled,
              isSecondDisabled: this.isEndSecondDisabled,
              onUpdateValue: this.handleEndTimePickerChange
            }
          )
        )
      ),
      h(
        'div',
        {
          ref: 'startDatesElRef',
          class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month`
          },
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-prev`,
              onClick: this.startCalendarPrevYear
            },
            resolveSlot(datePickerSlots['prev-year'], () => [h(FastBackwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__prev`,
              onClick: this.startCalendarPrevMonth
            },
            resolveSlot(datePickerSlots['prev-month'], () => [h(BackwardIcon, null)])
          ),
          h(PanelHeader, {
            monthYearSeparator: this.calendarHeaderMonthYearSeparator,
            monthBeforeYear: this.calendarMonthBeforeYear,
            value: this.startCalendarDateTime,
            onUpdateValue: this.onUpdateStartCalendarValue,
            mergedClsPrefix,
            calendarMonth: this.startCalendarMonth,
            calendarYear: this.startCalendarYear
          }),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__next`,
              onClick: this.startCalendarNextMonth
            },
            resolveSlot(datePickerSlots['next-month'], () => [h(ForwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-next`,
              onClick: this.startCalendarNextYear
            },
            resolveSlot(datePickerSlots['next-year'], () => [h(FastForwardIcon, null)])
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-weekdays`
          },
          this.weekdays.map((weekday) =>
            h(
              'div',
              {
                key: weekday,
                class: `${mergedClsPrefix}-date-panel-weekdays__day`
              },
              weekday
            )
          )
        ),
        h('div', {
          class: `${mergedClsPrefix}-date-panel__divider`
        }),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-dates`
          },
          this.startDateArray.map((dateItem2, i) => {
            const disabled = this.mergedIsDateDisabled(dateItem2.ts)
            return h(
              'div',
              {
                'data-n-date': true,
                key: i,
                class: [
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem2.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem2.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem2.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem2.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]: dateItem2.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]: dateItem2.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: disabled
                  }
                ],
                onClick: disabled
                  ? void 0
                  : () => {
                      this.handleDateClick(dateItem2)
                    },
                onMouseenter: disabled
                  ? void 0
                  : () => {
                      this.handleDateMouseEnter(dateItem2)
                    }
              },
              h('div', {
                class: `${mergedClsPrefix}-date-panel-date__trigger`
              }),
              dateItem2.dateObject.date,
              dateItem2.isCurrentDate
                ? h('div', {
                    class: `${mergedClsPrefix}-date-panel-date__sup`
                  })
                : null
            )
          })
        )
      ),
      h('div', {
        class: `${mergedClsPrefix}-date-panel__vertical-divider`
      }),
      h(
        'div',
        {
          ref: 'endDatesElRef',
          class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month`
          },
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-prev`,
              onClick: this.endCalendarPrevYear
            },
            resolveSlot(datePickerSlots['prev-year'], () => [h(FastBackwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__prev`,
              onClick: this.endCalendarPrevMonth
            },
            resolveSlot(datePickerSlots['prev-month'], () => [h(BackwardIcon, null)])
          ),
          h(PanelHeader, {
            monthBeforeYear: this.calendarMonthBeforeYear,
            value: this.endCalendarDateTime,
            onUpdateValue: this.onUpdateEndCalendarValue,
            mergedClsPrefix,
            monthYearSeparator: this.calendarHeaderMonthYearSeparator,
            calendarMonth: this.endCalendarMonth,
            calendarYear: this.endCalendarYear
          }),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__next`,
              onClick: this.endCalendarNextMonth
            },
            resolveSlot(datePickerSlots['next-month'], () => [h(ForwardIcon, null)])
          ),
          h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-month__fast-next`,
              onClick: this.endCalendarNextYear
            },
            resolveSlot(datePickerSlots['next-year'], () => [h(FastForwardIcon, null)])
          )
        ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-weekdays`
          },
          this.weekdays.map((weekday) =>
            h(
              'div',
              {
                key: weekday,
                class: `${mergedClsPrefix}-date-panel-weekdays__day`
              },
              weekday
            )
          )
        ),
        h('div', {
          class: `${mergedClsPrefix}-date-panel__divider`
        }),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-dates`
          },
          this.endDateArray.map((dateItem2, i) => {
            const disabled = this.mergedIsDateDisabled(dateItem2.ts)
            return h(
              'div',
              {
                'data-n-date': true,
                key: i,
                class: [
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem2.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem2.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem2.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem2.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]: dateItem2.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]: dateItem2.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: disabled
                  }
                ],
                onClick: disabled
                  ? void 0
                  : () => {
                      this.handleDateClick(dateItem2)
                    },
                onMouseenter: disabled
                  ? void 0
                  : () => {
                      this.handleDateMouseEnter(dateItem2)
                    }
              },
              h('div', {
                class: `${mergedClsPrefix}-date-panel-date__trigger`
              }),
              dateItem2.dateObject.date,
              dateItem2.isCurrentDate
                ? h('div', {
                    class: `${mergedClsPrefix}-date-panel-date__sup`
                  })
                : null
            )
          })
        )
      ),
      this.datePickerSlots.footer
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-footer`
            },
            this.datePickerSlots.footer()
          )
        : null,
      ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-actions`
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__prefix`
              },
              shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut) || typeof shortcut === 'function'
                    ? h(
                        XButton,
                        {
                          size: 'tiny',
                          onMouseenter: () => {
                            this.handleRangeShortcutMouseenter(shortcut)
                          },
                          onClick: () => {
                            this.handleRangeShortcutClick(shortcut)
                          },
                          onMouseleave: () => {
                            this.handleShortcutMouseleave()
                          }
                        },
                        {
                          default: () => key
                        }
                      )
                    : null
                })
            ),
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__suffix`
              },
              ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                ? resolveSlotWithTypedProps(
                    datePickerSlots.clear,
                    {
                      onClear: this.handleClearClick,
                      text: this.locale.clear
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleClearClick
                        },
                        {
                          default: () => this.locale.clear
                        }
                      )
                    ]
                  )
                : null,
              ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('confirm'))
                ? resolveSlotWithTypedProps(
                    datePickerSlots.confirm,
                    {
                      onConfirm: this.handleConfirmClick,
                      disabled: this.isRangeInvalid || this.isSelecting,
                      text: this.locale.confirm
                    },
                    () => [
                      h(
                        Button,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          type: 'primary',
                          disabled: this.isRangeInvalid || this.isSelecting,
                          onClick: this.handleConfirmClick
                        },
                        {
                          default: () => this.locale.confirm
                        }
                      )
                    ]
                  )
                : null
            )
          )
        : null,
      h(FocusDetector, {
        onFocus: this.handleFocusDetectorFocus
      })
    )
  }
})
const MonthRangePanel = defineComponent({
  name: 'MonthRangePanel',
  props: Object.assign(Object.assign({}, useDualCalendarProps), {
    type: {
      type: String,
      required: true
    }
  }),
  setup(props) {
    const useCalendarRef = useDualCalendar(props, props.type)
    const { dateLocaleRef } = useLocale('DatePicker')
    const renderItem = (item, i, mergedClsPrefix, type) => {
      const { handleColItemClick } = useCalendarRef
      const disabled = false
      return h(
        'div',
        {
          'data-n-date': true,
          key: i,
          class: [
            `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
            item.isCurrent &&
              `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`,
            item.selected &&
              `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`,
            disabled
          ],
          onClick: () => {
            handleColItemClick(item, type)
          }
        },
        item.type === 'month'
          ? getMonthString(item.dateObject.month, item.monthFormat, dateLocaleRef.value.locale)
          : item.type === 'quarter'
            ? getQuarterString(
                item.dateObject.quarter,
                item.quarterFormat,
                dateLocaleRef.value.locale
              )
            : getYearString(item.dateObject.year, item.yearFormat, dateLocaleRef.value.locale)
      )
    }
    onMounted(() => {
      useCalendarRef.justifyColumnsScrollState()
    })
    return Object.assign(Object.assign({}, useCalendarRef), {
      renderItem
    })
  },
  render() {
    var _a, _b, _c
    const { mergedClsPrefix, mergedTheme, shortcuts, type, renderItem, onRender } = this
    onRender === null || onRender === void 0 ? void 0 : onRender()
    return h(
      'div',
      {
        ref: 'selfRef',
        tabindex: 0,
        class: [
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--daterange`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ],
        onKeydown: this.handlePanelKeyDown,
        onFocus: this.handlePanelFocus
      },
      h(
        'div',
        {
          ref: 'startDatesElRef',
          class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month-calendar`
          },
          h(
            Scrollbar,
            {
              ref: 'startYearScrollbarRef',
              class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`,
              theme: mergedTheme.peers.Scrollbar,
              themeOverrides: mergedTheme.peerOverrides.Scrollbar,
              container: () => this.virtualListContainer('start'),
              content: () => this.virtualListContent('start'),
              horizontalRailStyle: {
                zIndex: 1
              },
              verticalRailStyle: {
                zIndex: 1
              }
            },
            {
              default: () =>
                h(
                  VVirtualList,
                  {
                    ref: 'startYearVlRef',
                    items: this.startYearArray,
                    itemSize: MONTH_ITEM_HEIGHT,
                    showScrollbar: false,
                    keyField: 'ts',
                    onScroll: this.handleStartYearVlScroll,
                    paddingBottom: 4
                  },
                  {
                    default: ({ item, index }) => {
                      return renderItem(item, index, mergedClsPrefix, 'start')
                    }
                  }
                )
            }
          ),
          type === 'monthrange' || type === 'quarterrange'
            ? h(
                'div',
                {
                  class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`
                },
                h(
                  Scrollbar,
                  {
                    ref: 'startMonthScrollbarRef',
                    theme: mergedTheme.peers.Scrollbar,
                    themeOverrides: mergedTheme.peerOverrides.Scrollbar
                  },
                  {
                    default: () => [
                      (type === 'monthrange' ? this.startMonthArray : this.startQuarterArray).map(
                        (item, i) => renderItem(item, i, mergedClsPrefix, 'start')
                      ),
                      type === 'monthrange' &&
                        h('div', {
                          class: `${mergedClsPrefix}-date-panel-month-calendar__padding`
                        })
                    ]
                  }
                )
              )
            : null
        )
      ),
      h('div', {
        class: `${mergedClsPrefix}-date-panel__vertical-divider`
      }),
      h(
        'div',
        {
          ref: 'endDatesElRef',
          class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`
        },
        h(
          'div',
          {
            class: `${mergedClsPrefix}-date-panel-month-calendar`
          },
          h(
            Scrollbar,
            {
              ref: 'endYearScrollbarRef',
              class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`,
              theme: mergedTheme.peers.Scrollbar,
              themeOverrides: mergedTheme.peerOverrides.Scrollbar,
              container: () => this.virtualListContainer('end'),
              content: () => this.virtualListContent('end'),
              horizontalRailStyle: {
                zIndex: 1
              },
              verticalRailStyle: {
                zIndex: 1
              }
            },
            {
              default: () =>
                h(
                  VVirtualList,
                  {
                    ref: 'endYearVlRef',
                    items: this.endYearArray,
                    itemSize: MONTH_ITEM_HEIGHT,
                    showScrollbar: false,
                    keyField: 'ts',
                    onScroll: this.handleEndYearVlScroll,
                    paddingBottom: 4
                  },
                  {
                    default: ({ item, index }) => {
                      return renderItem(item, index, mergedClsPrefix, 'end')
                    }
                  }
                )
            }
          ),
          type === 'monthrange' || type === 'quarterrange'
            ? h(
                'div',
                {
                  class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`
                },
                h(
                  Scrollbar,
                  {
                    ref: 'endMonthScrollbarRef',
                    theme: mergedTheme.peers.Scrollbar,
                    themeOverrides: mergedTheme.peerOverrides.Scrollbar
                  },
                  {
                    default: () => [
                      (type === 'monthrange' ? this.endMonthArray : this.endQuarterArray).map(
                        (item, i) => renderItem(item, i, mergedClsPrefix, 'end')
                      ),
                      type === 'monthrange' &&
                        h('div', {
                          class: `${mergedClsPrefix}-date-panel-month-calendar__padding`
                        })
                    ]
                  }
                )
              )
            : null
        )
      ),
      resolveWrappedSlot(this.datePickerSlots.footer, (children) => {
        return children
          ? h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-footer`
              },
              children
            )
          : null
      }),
      ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts
        ? h(
            'div',
            {
              class: `${mergedClsPrefix}-date-panel-actions`
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__prefix`
              },
              shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut) || typeof shortcut === 'function'
                    ? h(
                        XButton,
                        {
                          size: 'tiny',
                          onMouseenter: () => {
                            this.handleRangeShortcutMouseenter(shortcut)
                          },
                          onClick: () => {
                            this.handleRangeShortcutClick(shortcut)
                          },
                          onMouseleave: () => {
                            this.handleShortcutMouseleave()
                          }
                        },
                        {
                          default: () => key
                        }
                      )
                    : null
                })
            ),
            h(
              'div',
              {
                class: `${mergedClsPrefix}-date-panel-actions__suffix`
              },
              ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                ? resolveSlotWithTypedProps(
                    this.datePickerSlots.clear,
                    {
                      onClear: this.handleClearClick,
                      text: this.locale.clear
                    },
                    () => [
                      h(
                        XButton,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          onClick: this.handleClearClick
                        },
                        {
                          default: () => this.locale.clear
                        }
                      )
                    ]
                  )
                : null,
              ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('confirm'))
                ? resolveSlotWithTypedProps(
                    this.datePickerSlots.confirm,
                    {
                      disabled: this.isRangeInvalid,
                      onConfirm: this.handleConfirmClick,
                      text: this.locale.confirm
                    },
                    () => [
                      h(
                        XButton,
                        {
                          theme: mergedTheme.peers.Button,
                          themeOverrides: mergedTheme.peerOverrides.Button,
                          size: 'tiny',
                          type: 'primary',
                          disabled: this.isRangeInvalid,
                          onClick: this.handleConfirmClick
                        },
                        {
                          default: () => this.locale.confirm
                        }
                      )
                    ]
                  )
                : null
            )
          )
        : null,
      h(FocusDetector, {
        onFocus: this.handleFocusDetectorFocus
      })
    )
  }
})
const datePickerProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean,
    default: void 0
  },
  clearable: Boolean,
  updateValueOnClose: Boolean,
  calendarDayFormat: String,
  calendarHeaderYearFormat: String,
  calendarHeaderMonthFormat: String,
  calendarHeaderMonthYearSeparator: {
    type: String,
    default: ' '
  },
  calendarHeaderMonthBeforeYear: {
    type: Boolean,
    default: void 0
  },
  defaultValue: [Number, Array],
  defaultFormattedValue: [String, Array],
  defaultTime: [Number, String, Array],
  disabled: {
    type: Boolean,
    default: void 0
  },
  placement: {
    type: String,
    default: 'bottom-start'
  },
  value: [Number, Array],
  formattedValue: [String, Array],
  size: String,
  type: {
    type: String,
    default: 'date'
  },
  valueFormat: String,
  separator: String,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  format: String,
  dateFormat: String,
  timePickerFormat: String,
  actions: Array,
  shortcuts: Object,
  isDateDisabled: Function,
  isTimeDisabled: Function,
  show: {
    type: Boolean,
    default: void 0
  },
  panel: Boolean,
  ranges: Object,
  firstDayOfWeek: Number,
  inputReadonly: Boolean,
  closeOnSelect: Boolean,
  status: String,
  timePickerProps: [Object, Array],
  onClear: Function,
  onConfirm: Function,
  defaultCalendarStartTime: Number,
  defaultCalendarEndTime: Number,
  bindCalendarMonths: Boolean,
  monthFormat: {
    type: String,
    default: 'M'
  },
  yearFormat: {
    type: String,
    default: 'y'
  },
  quarterFormat: {
    type: String,
    default: "'Q'Q"
  },
  yearRange: {
    type: Array,
    default: () => [1901, 2100]
  },
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  'onUpdate:formattedValue': [Function, Array],
  onUpdateFormattedValue: [Function, Array],
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onNextMonth: Function,
  onPrevMonth: Function,
  onNextYear: Function,
  onPrevYear: Function,
  // deprecated
  onChange: [Function, Array]
})
const style = c([
  cB(
    'date-picker',
    `
 position: relative;
 z-index: auto;
 `,
    [
      cB(
        'date-picker-icon',
        `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `
      ),
      cB(
        'icon',
        `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `
      ),
      cM('disabled', [
        cB(
          'date-picker-icon',
          `
 color: var(--n-icon-color-disabled-override);
 `
        ),
        cB(
          'icon',
          `
 color: var(--n-icon-color-disabled-override);
 `
        )
      ])
    ]
  ),
  cB(
    'date-panel',
    `
 width: fit-content;
 outline: none;
 margin: 4px 0;
 display: grid;
 grid-template-columns: 0fr;
 border-radius: var(--n-panel-border-radius);
 background-color: var(--n-panel-color);
 color: var(--n-panel-text-color);
 user-select: none;
 `,
    [
      fadeInScaleUpTransition(),
      cM(
        'shadow',
        `
 box-shadow: var(--n-panel-box-shadow);
 `
      ),
      cB(
        'date-panel-calendar',
        {
          padding: 'var(--n-calendar-left-padding)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridArea: 'left-calendar'
        },
        [
          cM('end', {
            padding: 'var(--n-calendar-right-padding)',
            gridArea: 'right-calendar'
          })
        ]
      ),
      cB(
        'date-panel-month-calendar',
        {
          display: 'flex',
          gridArea: 'left-calendar'
        },
        [
          cE(
            'picker-col',
            `
 min-width: var(--n-scroll-item-width);
 height: calc(var(--n-scroll-item-height) * 6);
 user-select: none;
 -webkit-user-select: none;
 `,
            [
              c(
                '&:first-child',
                `
 min-width: calc(var(--n-scroll-item-width) + 4px);
 `,
                [cE('picker-col-item', [c('&::before', 'left: 4px;')])]
              ),
              cE(
                'padding',
                `
 height: calc(var(--n-scroll-item-height) * 5)
 `
              )
            ]
          ),
          cE(
            'picker-col-item',
            `
 z-index: 0;
 cursor: pointer;
 height: var(--n-scroll-item-height);
 box-sizing: border-box;
 padding-top: 4px;
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background: #0000;
 color: var(--n-item-text-color);
 `,
            [
              c(
                '&::before',
                `
 z-index: -1;
 content: "";
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-scroll-item-border-radius);
 transition: 
 background-color .3s var(--n-bezier);
 `
              ),
              cNotM('disabled', [
                c(
                  '&:hover::before',
                  `
 background-color: var(--n-item-color-hover);
 `
                ),
                cM(
                  'selected',
                  `
 color: var(--n-item-color-active);
 `,
                  [c('&::before', 'background-color: var(--n-item-color-hover);')]
                )
              ]),
              cM(
                'disabled',
                `
 color: var(--n-item-text-color-disabled);
 cursor: not-allowed;
 `,
                [
                  cM('selected', [
                    c(
                      '&::before',
                      `
 background-color: var(--n-item-color-disabled);
 `
                    )
                  ])
                ]
              )
            ]
          )
        ]
      ),
      cM('date', {
        gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 `
      }),
      cM('week', {
        gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 `
      }),
      cM('daterange', {
        gridTemplateAreas: `
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 `
      }),
      cM('datetime', {
        gridTemplateAreas: `
 "header"
 "left-calendar"
 "footer"
 "action"
 `
      }),
      cM('datetimerange', {
        gridTemplateAreas: `
 "header header header"
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 `
      }),
      cM('month', {
        gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 `
      }),
      cB('date-panel-footer', {
        gridArea: 'footer'
      }),
      cB('date-panel-actions', {
        gridArea: 'action'
      }),
      cB('date-panel-header', {
        gridArea: 'header'
      }),
      cB(
        'date-panel-header',
        `
 box-sizing: border-box;
 width: 100%;
 align-items: center;
 padding: var(--n-panel-header-padding);
 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid var(--n-panel-header-divider-color);
 `,
        [
          c('>', [
            c('*:not(:last-child)', {
              marginRight: '10px'
            }),
            c('*', {
              flex: 1,
              width: 0
            }),
            cB('time-picker', {
              zIndex: 1
            })
          ])
        ]
      ),
      cB(
        'date-panel-month',
        `
 box-sizing: border-box;
 display: grid;
 grid-template-columns: var(--n-calendar-title-grid-template-columns);
 align-items: center;
 justify-items: center;
 padding: var(--n-calendar-title-padding);
 height: var(--n-calendar-title-height);
 `,
        [
          cE(
            'prev, next, fast-prev, fast-next',
            `
 line-height: 0;
 cursor: pointer;
 width: var(--n-arrow-size);
 height: var(--n-arrow-size);
 color: var(--n-arrow-color);
 `
          ),
          cE(
            'month-year',
            `
 user-select: none;
 -webkit-user-select: none;
 flex-grow: 1;
 position: relative;
 `,
            [
              cE(
                'text',
                `
 font-size: var(--n-calendar-title-font-size);
 line-height: var(--n-calendar-title-font-size);
 font-weight: var(--n-calendar-title-font-weight);
 padding: 6px 8px;
 text-align: center;
 color: var(--n-calendar-title-text-color);
 cursor: pointer;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-panel-border-radius);
 `,
                [
                  cM(
                    'active',
                    `
 background-color: var(--n-calendar-title-color-hover);
 `
                  ),
                  c(
                    '&:hover',
                    `
 background-color: var(--n-calendar-title-color-hover);
 `
                  )
                ]
              )
            ]
          )
        ]
      ),
      cB(
        'date-panel-weekdays',
        `
 display: grid;
 margin: auto;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(1, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 margin-bottom: 4px;
 border-bottom: 1px solid var(--n-calendar-days-divider-color);
 `,
        [
          cE(
            'day',
            `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 line-height: 15px;
 width: var(--n-item-size);
 text-align: center;
 font-size: var(--n-calendar-days-font-size);
 color: var(--n-item-text-color);
 display: flex;
 align-items: center;
 justify-content: center;
 `
          )
        ]
      ),
      cB(
        'date-panel-dates',
        `
 margin: auto;
 display: grid;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(6, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 flex-wrap: wrap;
 `,
        [
          cB(
            'date-panel-date',
            `
 user-select: none;
 -webkit-user-select: none;
 position: relative;
 width: var(--n-item-size);
 height: var(--n-item-size);
 line-height: var(--n-item-size);
 text-align: center;
 font-size: var(--n-item-font-size);
 border-radius: var(--n-item-border-radius);
 z-index: 0;
 cursor: pointer;
 transition:
 background-color .2s var(--n-bezier),
 color .2s var(--n-bezier);
 `,
            [
              cE(
                'trigger',
                `
 position: absolute;
 left: calc(var(--n-item-size) / 2 - var(--n-item-cell-width) / 2);
 top: calc(var(--n-item-size) / 2 - var(--n-item-cell-height) / 2);
 width: var(--n-item-cell-width);
 height: var(--n-item-cell-height);
 `
              ),
              cM('current', [
                cE(
                  'sup',
                  `
 position: absolute;
 top: 2px;
 right: 2px;
 content: "";
 height: 4px;
 width: 4px;
 border-radius: 2px;
 background-color: var(--n-item-color-active);
 transition:
 background-color .2s var(--n-bezier);
 `
                )
              ]),
              c(
                '&::after',
                `
 content: "";
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 transition: background-color .3s var(--n-bezier);
 `
              ),
              cM('covered, start, end', [
                cNotM('excluded', [
                  c(
                    '&::before',
                    `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 background-color: var(--n-item-color-included);
 `
                  ),
                  c('&:nth-child(7n + 1)::before', {
                    borderTopLeftRadius: 'var(--n-item-border-radius)',
                    borderBottomLeftRadius: 'var(--n-item-border-radius)'
                  }),
                  c('&:nth-child(7n + 7)::before', {
                    borderTopRightRadius: 'var(--n-item-border-radius)',
                    borderBottomRightRadius: 'var(--n-item-border-radius)'
                  })
                ])
              ]),
              cM(
                'selected',
                {
                  color: 'var(--n-item-text-color-active)'
                },
                [
                  c('&::after', {
                    backgroundColor: 'var(--n-item-color-active)'
                  }),
                  cM('start', [
                    c('&::before', {
                      left: '50%'
                    })
                  ]),
                  cM('end', [
                    c('&::before', {
                      right: '50%'
                    })
                  ]),
                  cE('sup', {
                    backgroundColor: 'var(--n-panel-color)'
                  })
                ]
              ),
              cM(
                'excluded',
                {
                  color: 'var(--n-item-text-color-disabled)'
                },
                [
                  cM('selected', [
                    c('&::after', {
                      backgroundColor: 'var(--n-item-color-disabled)'
                    })
                  ])
                ]
              ),
              cM(
                'disabled',
                {
                  cursor: 'not-allowed',
                  color: 'var(--n-item-text-color-disabled)'
                },
                [
                  cM('covered', [
                    c('&::before', {
                      backgroundColor: 'var(--n-item-color-disabled)'
                    })
                  ]),
                  cM('selected', [
                    c('&::before', {
                      backgroundColor: 'var(--n-item-color-disabled)'
                    }),
                    c('&::after', {
                      backgroundColor: 'var(--n-item-color-disabled)'
                    })
                  ])
                ]
              ),
              cM('week-hovered', [
                c(
                  '&::before',
                  `
 background-color: var(--n-item-color-included);
 `
                ),
                c(
                  '&:nth-child(7n + 1)::before',
                  `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `
                ),
                c(
                  '&:nth-child(7n + 7)::before',
                  `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `
                )
              ]),
              cM(
                'week-selected',
                `
 color: var(--n-item-text-color-active)
 `,
                [
                  c(
                    '&::before',
                    `
 background-color: var(--n-item-color-active);
 `
                  ),
                  c(
                    '&:nth-child(7n + 1)::before',
                    `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `
                  ),
                  c(
                    '&:nth-child(7n + 7)::before',
                    `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `
                  )
                ]
              )
            ]
          )
        ]
      ),
      cNotM('week', [
        cB('date-panel-dates', [
          cB('date-panel-date', [
            cNotM('disabled', [
              cNotM('selected', [
                c(
                  '&:hover',
                  `
 background-color: var(--n-item-color-hover);
 `
                )
              ])
            ])
          ])
        ])
      ]),
      cM('week', [
        cB('date-panel-dates', [
          cB('date-panel-date', [
            c(
              '&::before',
              `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 transition: background-color .3s var(--n-bezier);
 `
            )
          ])
        ])
      ]),
      cE(
        'vertical-divider',
        `
 grid-area: divider;
 height: 100%;
 width: 1px;
 background-color: var(--n-calendar-divider-color);
 `
      ),
      cB(
        'date-panel-footer',
        `
 border-top: 1px solid var(--n-panel-action-divider-color);
 padding: var(--n-panel-extra-footer-padding);
 `
      ),
      cB(
        'date-panel-actions',
        `
 flex: 1;
 padding: var(--n-panel-action-padding);
 display: flex;
 align-items: center;
 justify-content: space-between;
 border-top: 1px solid var(--n-panel-action-divider-color);
 `,
        [
          cE(
            'prefix, suffix',
            `
 display: flex;
 margin-bottom: -8px;
 `
          ),
          cE(
            'suffix',
            `
 align-self: flex-end;
 `
          ),
          cE(
            'prefix',
            `
 flex-wrap: wrap;
 `
          ),
          cB(
            'button',
            `
 margin-bottom: 8px;
 `,
            [
              c(
                '&:not(:last-child)',
                `
 margin-right: 8px;
 `
              )
            ]
          )
        ]
      )
    ]
  ),
  c(
    '[data-n-date].transition-disabled',
    {
      transition: 'none !important'
    },
    [
      c('&::before, &::after', {
        transition: 'none !important'
      })
    ]
  )
])
function uniCalendarValidation(props, mergedValueRef) {
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled } = props
    const { value } = mergedValueRef
    if (value === null || Array.isArray(value)) return void 0
    return isTimeDisabled === null || isTimeDisabled === void 0 ? void 0 : isTimeDisabled(value)
  })
  const isHourDisabledRef = computed(() => {
    var _a
    return (_a = timePickerValidatorRef.value) === null || _a === void 0
      ? void 0
      : _a.isHourDisabled
  })
  const isMinuteDisabledRef = computed(() => {
    var _a
    return (_a = timePickerValidatorRef.value) === null || _a === void 0
      ? void 0
      : _a.isMinuteDisabled
  })
  const isSecondDisabledRef = computed(() => {
    var _a
    return (_a = timePickerValidatorRef.value) === null || _a === void 0
      ? void 0
      : _a.isSecondDisabled
  })
  const isDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      Array.isArray(value) ||
      !['date', 'datetime'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value, {
      type: 'input'
    })
  })
  const isTimeInvalidRef = computed(() => {
    const { type } = props
    const { value } = mergedValueRef
    if (value === null || !(type !== 'datetime') || Array.isArray(value)) {
      return false
    }
    const time2 = new Date(value)
    const hour = time2.getHours()
    const minute = time2.getMinutes()
    const second = time2.getMinutes()
    return (
      (isHourDisabledRef.value ? isHourDisabledRef.value(hour) : false) ||
      (isMinuteDisabledRef.value ? isMinuteDisabledRef.value(minute, hour) : false) ||
      (isSecondDisabledRef.value ? isSecondDisabledRef.value(second, minute, hour) : false)
    )
  })
  const isDateTimeInvalidRef = computed(() => {
    return isDateInvalidRef.value || isTimeInvalidRef.value
  })
  const isValueInvalidRef = computed(() => {
    const { type } = props
    if (type === 'date') return isDateInvalidRef.value
    if (type === 'datetime') return isDateTimeInvalidRef.value
    return false
  })
  return {
    // date & datetime
    isValueInvalidRef,
    isDateInvalidRef,
    // datetime only
    isTimeInvalidRef,
    isDateTimeInvalidRef,
    isHourDisabledRef,
    isMinuteDisabledRef,
    isSecondDisabledRef
  }
}
function dualCalendarValidation(props, mergedValueRef) {
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled } = props
    const { value } = mergedValueRef
    if (!Array.isArray(value) || !isTimeDisabled) {
      return [void 0, void 0]
    }
    return [
      isTimeDisabled === null || isTimeDisabled === void 0
        ? void 0
        : isTimeDisabled(value[0], 'start', value),
      isTimeDisabled === null || isTimeDisabled === void 0
        ? void 0
        : isTimeDisabled(value[1], 'end', value)
    ]
  })
  const timeValidator = {
    isStartHourDisabledRef: computed(() => {
      var _a
      return (_a = timePickerValidatorRef.value[0]) === null || _a === void 0
        ? void 0
        : _a.isHourDisabled
    }),
    isEndHourDisabledRef: computed(() => {
      var _a
      return (_a = timePickerValidatorRef.value[1]) === null || _a === void 0
        ? void 0
        : _a.isHourDisabled
    }),
    isStartMinuteDisabledRef: computed(() => {
      var _a
      return (_a = timePickerValidatorRef.value[0]) === null || _a === void 0
        ? void 0
        : _a.isMinuteDisabled
    }),
    isEndMinuteDisabledRef: computed(() => {
      var _a
      return (_a = timePickerValidatorRef.value[1]) === null || _a === void 0
        ? void 0
        : _a.isMinuteDisabled
    }),
    isStartSecondDisabledRef: computed(() => {
      var _a
      return (_a = timePickerValidatorRef.value[0]) === null || _a === void 0
        ? void 0
        : _a.isSecondDisabled
    }),
    isEndSecondDisabledRef: computed(() => {
      var _a
      return (_a = timePickerValidatorRef.value[1]) === null || _a === void 0
        ? void 0
        : _a.isSecondDisabled
    })
  }
  const isStartDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      !Array.isArray(value) ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value[0], 'start', value)
  })
  const isEndDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      !Array.isArray(value) ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value[1], 'end', value)
  })
  const isStartTimeInvalidRef = computed(() => {
    const { type } = props
    const { value } = mergedValueRef
    if (value === null || !Array.isArray(value) || type !== 'datetimerange') {
      return false
    }
    const startHours = getHours(value[0])
    const startMinutes = getMinutes(value[0])
    const startSeconds = getSeconds(value[0])
    const { isStartHourDisabledRef, isStartMinuteDisabledRef, isStartSecondDisabledRef } =
      timeValidator
    const startTimeInvalid =
      (isStartHourDisabledRef.value ? isStartHourDisabledRef.value(startHours) : false) ||
      (isStartMinuteDisabledRef.value
        ? isStartMinuteDisabledRef.value(startMinutes, startHours)
        : false) ||
      (isStartSecondDisabledRef.value
        ? isStartSecondDisabledRef.value(startSeconds, startMinutes, startHours)
        : false)
    return startTimeInvalid
  })
  const isEndTimeInvalidRef = computed(() => {
    const { type } = props
    const { value } = mergedValueRef
    if (value === null || !Array.isArray(value) || type !== 'datetimerange') {
      return false
    }
    const endHours = getHours(value[1])
    const endMinutes = getMinutes(value[1])
    const endSeconds = getSeconds(value[1])
    const { isEndHourDisabledRef, isEndMinuteDisabledRef, isEndSecondDisabledRef } = timeValidator
    const endTimeInvalid =
      (isEndHourDisabledRef.value ? isEndHourDisabledRef.value(endHours) : false) ||
      (isEndMinuteDisabledRef.value ? isEndMinuteDisabledRef.value(endMinutes, endHours) : false) ||
      (isEndSecondDisabledRef.value
        ? isEndSecondDisabledRef.value(endSeconds, endMinutes, endHours)
        : false)
    return endTimeInvalid
  })
  const isStartValueInvalidRef = computed(() => {
    return isStartDateInvalidRef.value || isStartTimeInvalidRef.value
  })
  const isEndValueInvalidRef = computed(() => {
    return isEndDateInvalidRef.value || isEndTimeInvalidRef.value
  })
  const isRangeInvalidRef = computed(() => {
    return isStartValueInvalidRef.value || isEndValueInvalidRef.value
  })
  return Object.assign(Object.assign({}, timeValidator), {
    isStartDateInvalidRef,
    isEndDateInvalidRef,
    isStartTimeInvalidRef,
    isEndTimeInvalidRef,
    isStartValueInvalidRef,
    isEndValueInvalidRef,
    isRangeInvalidRef
  })
}
const __unplugin_components_7 = defineComponent({
  name: 'DatePicker',
  props: datePickerProps,
  slots: Object,
  setup(props, { slots }) {
    var _a
    const { localeRef, dateLocaleRef } = useLocale('DatePicker')
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      mergedBorderedRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props)
    const panelInstRef = ref(null)
    const triggerElRef = ref(null)
    const inputInstRef = ref(null)
    const uncontrolledShowRef = ref(false)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale,
        useAdditionalWeekYearTokens: true
      }
    })
    const mergedFormatRef = computed(() => {
      const { format: format2 } = props
      if (format2) return format2
      switch (props.type) {
        case 'date':
        case 'daterange':
          return localeRef.value.dateFormat
        case 'datetime':
        case 'datetimerange':
          return localeRef.value.dateTimeFormat
        case 'year':
        case 'yearrange':
          return localeRef.value.yearTypeFormat
        case 'month':
        case 'monthrange':
          return localeRef.value.monthTypeFormat
        case 'quarter':
        case 'quarterrange':
          return localeRef.value.quarterFormat
        case 'week':
          return localeRef.value.weekFormat
      }
    })
    const mergedValueFormatRef = computed(() => {
      var _a2
      return (_a2 = props.valueFormat) !== null && _a2 !== void 0 ? _a2 : mergedFormatRef.value
    })
    function getTimestampValue(value) {
      if (value === null) return null
      const { value: mergedValueFormat } = mergedValueFormatRef
      const { value: dateFnsOptions } = dateFnsOptionsRef
      if (Array.isArray(value)) {
        return [
          strictParse(
            value[0],
            mergedValueFormat,
            /* @__PURE__ */ new Date(),
            dateFnsOptions
          ).getTime(),
          strictParse(
            value[1],
            mergedValueFormat,
            /* @__PURE__ */ new Date(),
            dateFnsOptions
          ).getTime()
        ]
      }
      return strictParse(
        value,
        mergedValueFormat,
        /* @__PURE__ */ new Date(),
        dateFnsOptions
      ).getTime()
    }
    const { defaultFormattedValue, defaultValue } = props
    const uncontrolledValueRef = ref(
      (_a =
        defaultFormattedValue !== void 0
          ? getTimestampValue(defaultFormattedValue)
          : defaultValue) !== null && _a !== void 0
        ? _a
        : null
    )
    const controlledValueRef = computed(() => {
      const { formattedValue } = props
      if (formattedValue !== void 0) {
        return getTimestampValue(formattedValue)
      }
      return props.value
    })
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef)
    const pendingValueRef = ref(null)
    watchEffect(() => {
      pendingValueRef.value = mergedValueRef.value
    })
    const singleInputValueRef = ref('')
    const rangeStartInputValueRef = ref('')
    const rangeEndInputValueRef = ref('')
    const themeRef = useTheme(
      'DatePicker',
      '-date-picker',
      style,
      datePickerLight,
      props,
      mergedClsPrefixRef
    )
    const timePickerSizeRef = computed(() => {
      var _a2, _b
      return (
        ((_b =
          (_a2 =
            mergedComponentPropsRef === null || mergedComponentPropsRef === void 0
              ? void 0
              : mergedComponentPropsRef.value) === null || _a2 === void 0
            ? void 0
            : _a2.DatePicker) === null || _b === void 0
          ? void 0
          : _b.timePickerSize) || 'small'
      )
    })
    const isRangeRef = computed(() => {
      return ['daterange', 'datetimerange', 'monthrange', 'quarterrange', 'yearrange'].includes(
        props.type
      )
    })
    const localizedPlacehoderRef = computed(() => {
      const { placeholder } = props
      if (placeholder === void 0) {
        const { type } = props
        switch (type) {
          case 'date':
            return localeRef.value.datePlaceholder
          case 'datetime':
            return localeRef.value.datetimePlaceholder
          case 'month':
            return localeRef.value.monthPlaceholder
          case 'year':
            return localeRef.value.yearPlaceholder
          case 'quarter':
            return localeRef.value.quarterPlaceholder
          case 'week':
            return localeRef.value.weekPlaceholder
          default:
            return ''
        }
      } else {
        return placeholder
      }
    })
    const localizedStartPlaceholderRef = computed(() => {
      if (props.startPlaceholder === void 0) {
        if (props.type === 'daterange') {
          return localeRef.value.startDatePlaceholder
        } else if (props.type === 'datetimerange') {
          return localeRef.value.startDatetimePlaceholder
        } else if (props.type === 'monthrange') {
          return localeRef.value.startMonthPlaceholder
        }
        return ''
      } else {
        return props.startPlaceholder
      }
    })
    const localizedEndPlaceholderRef = computed(() => {
      if (props.endPlaceholder === void 0) {
        if (props.type === 'daterange') {
          return localeRef.value.endDatePlaceholder
        } else if (props.type === 'datetimerange') {
          return localeRef.value.endDatetimePlaceholder
        } else if (props.type === 'monthrange') {
          return localeRef.value.endMonthPlaceholder
        }
        return ''
      } else {
        return props.endPlaceholder
      }
    })
    const mergedActionsRef = computed(() => {
      const { actions, type, clearable } = props
      if (actions === null) return []
      if (actions !== void 0) return actions
      const result = clearable ? ['clear'] : []
      switch (type) {
        case 'date':
        case 'week': {
          result.push('now')
          return result
        }
        case 'datetime': {
          result.push('now', 'confirm')
          return result
        }
        case 'daterange': {
          result.push('confirm')
          return result
        }
        case 'datetimerange': {
          result.push('confirm')
          return result
        }
        case 'month': {
          result.push('now', 'confirm')
          return result
        }
        case 'year': {
          result.push('now')
          return result
        }
        case 'quarter': {
          result.push('now', 'confirm')
          return result
        }
        case 'monthrange':
        case 'yearrange':
        case 'quarterrange': {
          result.push('confirm')
          return result
        }
        default: {
          warn(
            'date-picker',
            "The type is wrong, n-date-picker's type only supports `date`, `datetime`, `daterange` and `datetimerange`."
          )
          break
        }
      }
    })
    function getFormattedValue(value) {
      if (value === null) return null
      if (Array.isArray(value)) {
        const { value: mergedValueFormat } = mergedValueFormatRef
        const { value: dateFnsOptions } = dateFnsOptionsRef
        return [
          format$1(value[0], mergedValueFormat, dateFnsOptions),
          format$1(value[1], mergedValueFormat, dateFnsOptionsRef.value)
        ]
      } else {
        return format$1(value, mergedValueFormatRef.value, dateFnsOptionsRef.value)
      }
    }
    function doUpdatePendingValue(value) {
      pendingValueRef.value = value
    }
    function doUpdateFormattedValue(value, timestampValue) {
      const { 'onUpdate:formattedValue': _onUpdateFormattedValue, onUpdateFormattedValue } = props
      if (_onUpdateFormattedValue) {
        call(_onUpdateFormattedValue, value, timestampValue)
      }
      if (onUpdateFormattedValue) {
        call(onUpdateFormattedValue, value, timestampValue)
      }
    }
    function doUpdateValue(value, options) {
      const { 'onUpdate:value': _onUpdateValue, onUpdateValue, onChange } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      const formattedValue = getFormattedValue(value)
      if (options.doConfirm) {
        doConfirm(value, formattedValue)
      }
      if (onUpdateValue) {
        call(onUpdateValue, value, formattedValue)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, formattedValue)
      }
      if (onChange) call(onChange, value, formattedValue)
      uncontrolledValueRef.value = value
      doUpdateFormattedValue(formattedValue, value)
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doClear() {
      const { onClear } = props
      onClear === null || onClear === void 0 ? void 0 : onClear()
    }
    function doConfirm(value, formattedValue) {
      const { onConfirm } = props
      if (onConfirm) onConfirm(value, formattedValue)
    }
    function doFocus(e) {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    }
    function doBlur(e) {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doUpdateShow(show) {
      const { 'onUpdate:show': _onUpdateShow, onUpdateShow } = props
      if (_onUpdateShow) call(_onUpdateShow, show)
      if (onUpdateShow) call(onUpdateShow, show)
      uncontrolledShowRef.value = show
    }
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        if (mergedShowRef.value) {
          markEventEffectPerformed(e)
          closeCalendar({
            returnFocus: true
          })
        }
      }
    }
    function handleInputKeydown(e) {
      if (e.key === 'Escape' && mergedShowRef.value) {
        markEventEffectPerformed(e)
      }
    }
    function handleClear() {
      var _a2
      doUpdateShow(false)
      ;(_a2 = inputInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.deactivate()
      doClear()
    }
    function handlePanelClear() {
      var _a2
      ;(_a2 = inputInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.deactivate()
      doClear()
    }
    function handlePanelTabOut() {
      closeCalendar({
        returnFocus: true
      })
    }
    function handleClickOutside(e) {
      var _a2
      if (
        mergedShowRef.value &&
        !((_a2 = triggerElRef.value) === null || _a2 === void 0
          ? void 0
          : _a2.contains(getPreciseEventTarget(e)))
      ) {
        closeCalendar({
          returnFocus: false
        })
      }
    }
    function handlePanelClose(disableUpdateOnClose) {
      closeCalendar({
        returnFocus: true,
        disableUpdateOnClose
      })
    }
    function handlePanelUpdateValue(value, doUpdate) {
      if (doUpdate) {
        doUpdateValue(value, {
          doConfirm: false
        })
      } else {
        doUpdatePendingValue(value)
      }
    }
    function handlePanelConfirm() {
      const pendingValue = pendingValueRef.value
      doUpdateValue(
        Array.isArray(pendingValue) ? [pendingValue[0], pendingValue[1]] : pendingValue,
        {
          doConfirm: true
        }
      )
    }
    function deriveInputState() {
      const { value } = pendingValueRef
      if (isRangeRef.value) {
        if (Array.isArray(value) || value === null) {
          deriveRangeInputState(value)
        }
      } else {
        if (!Array.isArray(value)) {
          deriveSingleInputState(value)
        }
      }
    }
    function deriveSingleInputState(value) {
      if (value === null) {
        singleInputValueRef.value = ''
      } else {
        singleInputValueRef.value = format$1(value, mergedFormatRef.value, dateFnsOptionsRef.value)
      }
    }
    function deriveRangeInputState(values) {
      if (values === null) {
        rangeStartInputValueRef.value = ''
        rangeEndInputValueRef.value = ''
      } else {
        const dateFnsOptions = dateFnsOptionsRef.value
        rangeStartInputValueRef.value = format$1(values[0], mergedFormatRef.value, dateFnsOptions)
        rangeEndInputValueRef.value = format$1(values[1], mergedFormatRef.value, dateFnsOptions)
      }
    }
    function handleInputActivate() {
      if (!mergedShowRef.value) {
        openCalendar()
      }
    }
    function handleInputBlur(e) {
      var _a2
      if (
        !((_a2 = panelInstRef.value) === null || _a2 === void 0
          ? void 0
          : _a2.$el.contains(e.relatedTarget))
      ) {
        doBlur(e)
        deriveInputState()
        closeCalendar({
          returnFocus: false
        })
      }
    }
    function handleInputDeactivate() {
      if (mergedDisabledRef.value) return
      deriveInputState()
      closeCalendar({
        returnFocus: false
      })
    }
    function handleSingleUpdateValue(v) {
      if (v === '') {
        doUpdateValue(null, {
          doConfirm: false
        })
        pendingValueRef.value = null
        singleInputValueRef.value = ''
        return
      }
      const newSelectedDateTime = strictParse(
        v,
        mergedFormatRef.value,
        /* @__PURE__ */ new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(newSelectedDateTime)) {
        doUpdateValue(getTime(newSelectedDateTime), {
          doConfirm: false
        })
        deriveInputState()
      } else {
        singleInputValueRef.value = v
      }
    }
    function handleRangeUpdateValue(v, { source }) {
      if (v[0] === '' && v[1] === '') {
        doUpdateValue(null, {
          doConfirm: false
        })
        pendingValueRef.value = null
        rangeStartInputValueRef.value = ''
        rangeEndInputValueRef.value = ''
        return
      }
      const [startTime, endTime] = v
      const newStartTime = strictParse(
        startTime,
        mergedFormatRef.value,
        /* @__PURE__ */ new Date(),
        dateFnsOptionsRef.value
      )
      const newEndTime = strictParse(
        endTime,
        mergedFormatRef.value,
        /* @__PURE__ */ new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(newStartTime) && isValid(newEndTime)) {
        let newStartTs = getTime(newStartTime)
        let newEndTs = getTime(newEndTime)
        if (newEndTime < newStartTime) {
          if (source === 0) {
            newEndTs = newStartTs
          } else {
            newStartTs = newEndTs
          }
        }
        doUpdateValue([newStartTs, newEndTs], {
          doConfirm: false
        })
        deriveInputState()
      } else {
        ;[rangeStartInputValueRef.value, rangeEndInputValueRef.value] = v
      }
    }
    function handleTriggerClick(e) {
      if (mergedDisabledRef.value) return
      if (happensIn(e, 'clear')) return
      if (!mergedShowRef.value) {
        openCalendar()
      }
    }
    function handleInputFocus(e) {
      if (mergedDisabledRef.value) return
      doFocus(e)
    }
    function openCalendar() {
      if (mergedDisabledRef.value || mergedShowRef.value) return
      doUpdateShow(true)
    }
    function closeCalendar({ returnFocus, disableUpdateOnClose }) {
      var _a2
      if (mergedShowRef.value) {
        doUpdateShow(false)
        if (props.type !== 'date' && props.updateValueOnClose && !disableUpdateOnClose) {
          handlePanelConfirm()
        }
        if (returnFocus) {
          ;(_a2 = inputInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus()
        }
      }
    }
    watch(pendingValueRef, () => {
      deriveInputState()
    })
    deriveInputState()
    watch(mergedShowRef, (value) => {
      if (!value) {
        pendingValueRef.value = mergedValueRef.value
      }
    })
    const uniVaidation = uniCalendarValidation(props, pendingValueRef)
    const dualValidation = dualCalendarValidation(props, pendingValueRef)
    provide(
      datePickerInjectionKey,
      Object.assign(
        Object.assign(
          Object.assign(
            {
              mergedClsPrefixRef,
              mergedThemeRef: themeRef,
              timePickerSizeRef,
              localeRef,
              dateLocaleRef,
              firstDayOfWeekRef: toRef(props, 'firstDayOfWeek'),
              isDateDisabledRef: toRef(props, 'isDateDisabled'),
              rangesRef: toRef(props, 'ranges'),
              timePickerPropsRef: toRef(props, 'timePickerProps'),
              closeOnSelectRef: toRef(props, 'closeOnSelect'),
              updateValueOnCloseRef: toRef(props, 'updateValueOnClose'),
              monthFormatRef: toRef(props, 'monthFormat'),
              yearFormatRef: toRef(props, 'yearFormat'),
              quarterFormatRef: toRef(props, 'quarterFormat'),
              yearRangeRef: toRef(props, 'yearRange')
            },
            uniVaidation
          ),
          dualValidation
        ),
        {
          datePickerSlots: slots
        }
      )
    )
    const exposedMethods = {
      focus: () => {
        var _a2
        ;(_a2 = inputInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus()
      },
      blur: () => {
        var _a2
        ;(_a2 = inputInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.blur()
      }
    }
    const triggerCssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { iconColor, iconColorDisabled }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-icon-color-override': iconColor,
        '--n-icon-color-disabled-override': iconColorDisabled
      }
    })
    const triggerThemeClassHandle = inlineThemeDisabled
      ? useThemeClass('date-picker-trigger', void 0, triggerCssVarsRef, props)
      : void 0
    const cssVarsRef = computed(() => {
      const { type } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          calendarTitleFontSize,
          calendarDaysFontSize,
          itemFontSize,
          itemTextColor,
          itemColorDisabled,
          itemColorIncluded,
          itemColorHover,
          itemColorActive,
          itemBorderRadius,
          itemTextColorDisabled,
          itemTextColorActive,
          panelColor,
          panelTextColor,
          arrowColor,
          calendarTitleTextColor,
          panelActionDividerColor,
          panelHeaderDividerColor,
          calendarDaysDividerColor,
          panelBoxShadow,
          panelBorderRadius,
          calendarTitleFontWeight,
          panelExtraFooterPadding,
          panelActionPadding,
          itemSize,
          itemCellWidth,
          itemCellHeight,
          scrollItemWidth,
          scrollItemHeight,
          calendarTitlePadding,
          calendarTitleHeight,
          calendarDaysHeight,
          calendarDaysTextColor,
          arrowSize,
          panelHeaderPadding,
          calendarDividerColor,
          calendarTitleGridTempateColumns,
          iconColor,
          iconColorDisabled,
          scrollItemBorderRadius,
          calendarTitleColorHover,
          [createKey('calendarLeftPadding', type)]: calendarLeftPadding,
          [createKey('calendarRightPadding', type)]: calendarRightPadding
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-panel-border-radius': panelBorderRadius,
        '--n-panel-color': panelColor,
        '--n-panel-box-shadow': panelBoxShadow,
        '--n-panel-text-color': panelTextColor,
        // panel header
        '--n-panel-header-padding': panelHeaderPadding,
        '--n-panel-header-divider-color': panelHeaderDividerColor,
        // panel calendar
        '--n-calendar-left-padding': calendarLeftPadding,
        '--n-calendar-right-padding': calendarRightPadding,
        '--n-calendar-title-color-hover': calendarTitleColorHover,
        '--n-calendar-title-height': calendarTitleHeight,
        '--n-calendar-title-padding': calendarTitlePadding,
        '--n-calendar-title-font-size': calendarTitleFontSize,
        '--n-calendar-title-font-weight': calendarTitleFontWeight,
        '--n-calendar-title-text-color': calendarTitleTextColor,
        '--n-calendar-title-grid-template-columns': calendarTitleGridTempateColumns,
        '--n-calendar-days-height': calendarDaysHeight,
        '--n-calendar-days-divider-color': calendarDaysDividerColor,
        '--n-calendar-days-font-size': calendarDaysFontSize,
        '--n-calendar-days-text-color': calendarDaysTextColor,
        '--n-calendar-divider-color': calendarDividerColor,
        // panel action
        '--n-panel-action-padding': panelActionPadding,
        '--n-panel-extra-footer-padding': panelExtraFooterPadding,
        '--n-panel-action-divider-color': panelActionDividerColor,
        // panel item
        '--n-item-font-size': itemFontSize,
        '--n-item-border-radius': itemBorderRadius,
        '--n-item-size': itemSize,
        '--n-item-cell-width': itemCellWidth,
        '--n-item-cell-height': itemCellHeight,
        '--n-item-text-color': itemTextColor,
        '--n-item-color-included': itemColorIncluded,
        '--n-item-color-disabled': itemColorDisabled,
        '--n-item-color-hover': itemColorHover,
        '--n-item-color-active': itemColorActive,
        '--n-item-text-color-disabled': itemTextColorDisabled,
        '--n-item-text-color-active': itemTextColorActive,
        // scroll item
        '--n-scroll-item-width': scrollItemWidth,
        '--n-scroll-item-height': scrollItemHeight,
        '--n-scroll-item-border-radius': scrollItemBorderRadius,
        // panel arrow
        '--n-arrow-size': arrowSize,
        '--n-arrow-color': arrowColor,
        // icon in trigger
        '--n-icon-color': iconColor,
        '--n-icon-color-disabled': iconColorDisabled
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'date-picker',
          computed(() => {
            return props.type
          }),
          cssVarsRef,
          props
        )
      : void 0
    return Object.assign(Object.assign({}, exposedMethods), {
      mergedStatus: mergedStatusRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      pendingValue: pendingValueRef,
      panelInstRef,
      triggerElRef,
      inputInstRef,
      isMounted: isMounted(),
      displayTime: singleInputValueRef,
      displayStartTime: rangeStartInputValueRef,
      displayEndTime: rangeEndInputValueRef,
      mergedShow: mergedShowRef,
      adjustedTo: useAdjustedTo(props),
      isRange: isRangeRef,
      localizedStartPlaceholder: localizedStartPlaceholderRef,
      localizedEndPlaceholder: localizedEndPlaceholderRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      localizedPlacehoder: localizedPlacehoderRef,
      isValueInvalid: uniVaidation.isValueInvalidRef,
      isStartValueInvalid: dualValidation.isStartValueInvalidRef,
      isEndValueInvalid: dualValidation.isEndValueInvalidRef,
      handleInputKeydown,
      handleClickOutside,
      handleKeydown,
      handleClear,
      handlePanelClear,
      handleTriggerClick,
      handleInputActivate,
      handleInputDeactivate,
      handleInputFocus,
      handleInputBlur,
      handlePanelTabOut,
      handlePanelClose,
      handleRangeUpdateValue,
      handleSingleUpdateValue,
      handlePanelUpdateValue,
      handlePanelConfirm,
      mergedTheme: themeRef,
      actions: mergedActionsRef,
      triggerCssVars: inlineThemeDisabled ? void 0 : triggerCssVarsRef,
      triggerThemeClass:
        triggerThemeClassHandle === null || triggerThemeClassHandle === void 0
          ? void 0
          : triggerThemeClassHandle.themeClass,
      triggerOnRender:
        triggerThemeClassHandle === null || triggerThemeClassHandle === void 0
          ? void 0
          : triggerThemeClassHandle.onRender,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.themeClass,
      onRender:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.onRender,
      onNextMonth: props.onNextMonth,
      onPrevMonth: props.onPrevMonth,
      onNextYear: props.onNextYear,
      onPrevYear: props.onPrevYear
    })
  },
  render() {
    const { clearable, triggerOnRender, mergedClsPrefix, $slots } = this
    const commonPanelProps = {
      onUpdateValue: this.handlePanelUpdateValue,
      onTabOut: this.handlePanelTabOut,
      onClose: this.handlePanelClose,
      onClear: this.handlePanelClear,
      onKeydown: this.handleKeydown,
      onConfirm: this.handlePanelConfirm,
      ref: 'panelInstRef',
      value: this.pendingValue,
      active: this.mergedShow,
      actions: this.actions,
      shortcuts: this.shortcuts,
      style: this.cssVars,
      defaultTime: this.defaultTime,
      themeClass: this.themeClass,
      panel: this.panel,
      inputReadonly: this.inputReadonly || this.mergedDisabled,
      onRender: this.onRender,
      onNextMonth: this.onNextMonth,
      onPrevMonth: this.onPrevMonth,
      onNextYear: this.onNextYear,
      onPrevYear: this.onPrevYear,
      timePickerFormat: this.timePickerFormat,
      dateFormat: this.dateFormat,
      calendarDayFormat: this.calendarDayFormat,
      calendarHeaderYearFormat: this.calendarHeaderYearFormat,
      calendarHeaderMonthFormat: this.calendarHeaderMonthFormat,
      calendarHeaderMonthYearSeparator: this.calendarHeaderMonthYearSeparator,
      calendarHeaderMonthBeforeYear: this.calendarHeaderMonthBeforeYear
    }
    const renderPanel = () => {
      const { type } = this
      return type === 'datetime'
        ? h(
            DatetimePanel,
            Object.assign({}, commonPanelProps, {
              defaultCalendarStartTime: this.defaultCalendarStartTime
            }),
            $slots
          )
        : type === 'daterange'
          ? h(
              DaterangePanel,
              Object.assign({}, commonPanelProps, {
                defaultCalendarStartTime: this.defaultCalendarStartTime,
                defaultCalendarEndTime: this.defaultCalendarEndTime,
                bindCalendarMonths: this.bindCalendarMonths
              }),
              $slots
            )
          : type === 'datetimerange'
            ? h(
                DatetimerangePanel,
                Object.assign({}, commonPanelProps, {
                  defaultCalendarStartTime: this.defaultCalendarStartTime,
                  defaultCalendarEndTime: this.defaultCalendarEndTime,
                  bindCalendarMonths: this.bindCalendarMonths
                }),
                $slots
              )
            : type === 'month' || type === 'year' || type === 'quarter'
              ? h(
                  MonthPanel,
                  Object.assign({}, commonPanelProps, {
                    type,
                    key: type
                  })
                )
              : type === 'monthrange' || type === 'yearrange' || type === 'quarterrange'
                ? h(
                    MonthRangePanel,
                    Object.assign({}, commonPanelProps, {
                      type
                    })
                  )
                : h(
                    DatePanel,
                    Object.assign({}, commonPanelProps, {
                      type,
                      defaultCalendarStartTime: this.defaultCalendarStartTime
                    }),
                    $slots
                  )
    }
    if (this.panel) {
      return renderPanel()
    }
    triggerOnRender === null || triggerOnRender === void 0 ? void 0 : triggerOnRender()
    const commonInputProps = {
      bordered: this.mergedBordered,
      size: this.mergedSize,
      passivelyActivated: true,
      disabled: this.mergedDisabled,
      readonly: this.inputReadonly || this.mergedDisabled,
      clearable,
      onClear: this.handleClear,
      onClick: this.handleTriggerClick,
      onKeydown: this.handleInputKeydown,
      onActivate: this.handleInputActivate,
      onDeactivate: this.handleInputDeactivate,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur
    }
    return h(
      'div',
      {
        ref: 'triggerElRef',
        class: [
          `${mergedClsPrefix}-date-picker`,
          this.mergedDisabled && `${mergedClsPrefix}-date-picker--disabled`,
          this.isRange && `${mergedClsPrefix}-date-picker--range`,
          this.triggerThemeClass
        ],
        style: this.triggerCssVars,
        onKeydown: this.handleKeydown
      },
      h(Binder, null, {
        default: () => [
          h(VTarget, null, {
            default: () =>
              this.isRange
                ? h(
                    __unplugin_components_1,
                    Object.assign(
                      {
                        ref: 'inputInstRef',
                        status: this.mergedStatus,
                        value: [this.displayStartTime, this.displayEndTime],
                        placeholder: [this.localizedStartPlaceholder, this.localizedEndPlaceholder],
                        textDecoration: [
                          this.isStartValueInvalid ? 'line-through' : '',
                          this.isEndValueInvalid ? 'line-through' : ''
                        ],
                        pair: true,
                        onUpdateValue: this.handleRangeUpdateValue,
                        theme: this.mergedTheme.peers.Input,
                        themeOverrides: this.mergedTheme.peerOverrides.Input,
                        internalForceFocus: this.mergedShow,
                        internalDeactivateOnEnter: true
                      },
                      commonInputProps
                    ),
                    {
                      separator: () =>
                        this.separator === void 0
                          ? resolveSlot($slots.separator, () => [
                              h(
                                NBaseIcon,
                                {
                                  clsPrefix: mergedClsPrefix,
                                  class: `${mergedClsPrefix}-date-picker-icon`
                                },
                                {
                                  default: () => h(ToIcon, null)
                                }
                              )
                            ])
                          : this.separator,
                      [clearable ? 'clear-icon-placeholder' : 'suffix']: () =>
                        resolveSlot($slots['date-icon'], () => [
                          h(
                            NBaseIcon,
                            {
                              clsPrefix: mergedClsPrefix,
                              class: `${mergedClsPrefix}-date-picker-icon`
                            },
                            {
                              default: () => h(DateIcon, null)
                            }
                          )
                        ])
                    }
                  )
                : h(
                    __unplugin_components_1,
                    Object.assign(
                      {
                        ref: 'inputInstRef',
                        status: this.mergedStatus,
                        value: this.displayTime,
                        placeholder: this.localizedPlacehoder,
                        textDecoration: this.isValueInvalid && !this.isRange ? 'line-through' : '',
                        onUpdateValue: this.handleSingleUpdateValue,
                        theme: this.mergedTheme.peers.Input,
                        themeOverrides: this.mergedTheme.peerOverrides.Input,
                        internalForceFocus: this.mergedShow,
                        internalDeactivateOnEnter: true
                      },
                      commonInputProps
                    ),
                    {
                      [clearable ? 'clear-icon-placeholder' : 'suffix']: () =>
                        h(
                          NBaseIcon,
                          {
                            clsPrefix: mergedClsPrefix,
                            class: `${mergedClsPrefix}-date-picker-icon`
                          },
                          {
                            default: () =>
                              resolveSlot($slots['date-icon'], () => [h(DateIcon, null)])
                          }
                        )
                    }
                  )
          }),
          h(
            VFollower,
            {
              show: this.mergedShow,
              containerClass: this.namespace,
              to: this.adjustedTo,
              teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
              placement: this.placement
            },
            {
              default: () =>
                h(
                  Transition,
                  {
                    name: 'fade-in-scale-up-transition',
                    appear: this.isMounted
                  },
                  {
                    default: () => {
                      if (!this.mergedShow) return null
                      return withDirectives(renderPanel(), [
                        [
                          clickoutside,
                          this.handleClickOutside,
                          void 0,
                          {
                            capture: true
                          }
                        ]
                      ])
                    }
                  }
                )
            }
          )
        ]
      })
    )
  }
})
const _hoisted_1 = { class: 'el-container container' }
const _hoisted_2 = { class: 'el-aside el-aside-left' }
const _hoisted_3 = {
  class: 'el-main',
  style: { 'padding-right': '20px' }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'detail',
  setup(__props) {
    const router = useRouter()
    const userStore = useUserStore()
    const { message: message2 } = useInject()
    const cropper = ref(false)
    const loading = ref(false)
    const detail2 = reactive({
      avatar: '',
      nickname: '',
      mobile: '',
      email: '',
      gender: '0',
      motto: '0',
      birthday: ''
    })
    const loadDetail = async () => {
      const { code, data } = await ServUserDetail()
      if (code != 200 || !data) return
      detail2.nickname = data.nickname
      detail2.mobile = data.mobile
      detail2.email = data.email
      detail2.gender = data.gender.toString()
      detail2.motto = data.motto
      detail2.avatar = data.avatar
      if (data.birthday) {
        detail2.birthday = data.birthday
      }
    }
    const onChangeDetail = async () => {
      if (!detail2.nickname.trim()) {
        return message2.warning('昵称不能为空')
      }
      if (detail2.motto.length > 500) {
        return message2.warning('个性签名文字长度不能超过500')
      }
      const { code } = await ServUserUpdate(
        {
          nickname: detail2.nickname.trim(),
          avatar: detail2.avatar,
          motto: detail2.motto,
          gender: parseInt(detail2.gender),
          birthday: detail2.birthday
        },
        { loading, successText: '信息保存成功' }
      )
      if (code != 200) return
      userStore.avatar = detail2.avatar
      userStore.motto = detail2.motto
    }
    const onUploadAvatar = (avatar) => {
      cropper.value = false
      detail2.avatar = avatar
      onChangeDetail()
    }
    loadDetail()
    return (_ctx, _cache) => {
      const _component_n_avatar = __unplugin_components_0
      const _component_n_button = Button
      const _component_n_form_item = __unplugin_components_3
      const _component_n_input = __unplugin_components_1
      const _component_n_radio = __unplugin_components_0$1
      const _component_n_space = __unplugin_components_1$1
      const _component_n_radio_group = __unplugin_components_2
      const _component_n_date_picker = __unplugin_components_7
      const _component_n_form = __unplugin_components_7$1
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            _cache[16] || (_cache[16] = createBaseVNode('h3', { class: 'title' }, '个人信息', -1)),
            createBaseVNode('section', _hoisted_1, [
              createBaseVNode('aside', _hoisted_2, [
                createVNode(
                  _component_n_avatar,
                  {
                    size: 150,
                    src: unref(detail2).avatar,
                    onClick: _cache[0] || (_cache[0] = ($event) => (cropper.value = true)),
                    class: 'avatar-box pointer'
                  },
                  null,
                  8,
                  ['src']
                ),
                createVNode(
                  _component_n_button,
                  {
                    text: '',
                    onClick: _cache[1] || (_cache[1] = ($event) => (cropper.value = true))
                  },
                  {
                    default: withCtx(
                      () => _cache[9] || (_cache[9] = [createTextVNode(' 点击修改头像 ', -1)])
                    ),
                    _: 1,
                    __: [9]
                  }
                )
              ]),
              createBaseVNode('main', _hoisted_3, [
                createVNode(
                  _component_n_form,
                  {
                    ref: 'formRef',
                    'label-placement': 'left',
                    'label-width': 'auto',
                    'require-mark-placement': 'right-hanging',
                    size: 'medium',
                    style: { 'max-width': '500px', 'margin-top': '25px' }
                  },
                  {
                    default: withCtx(() => [
                      createVNode(
                        _component_n_form_item,
                        { label: '登录账号：' },
                        {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(unref(hidePhone)(unref(detail2).mobile)) + ' ',
                              1
                            ),
                            createVNode(
                              _component_n_button,
                              {
                                class: 'mt-l15',
                                type: 'primary',
                                text: '',
                                onClick:
                                  _cache[2] ||
                                  (_cache[2] = ($event) => unref(router).push('/settings/security'))
                              },
                              {
                                default: withCtx(
                                  () => _cache[10] || (_cache[10] = [createTextVNode(' 修改 ', -1)])
                                ),
                                _: 1,
                                __: [10]
                              }
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        { label: '电子邮箱：' },
                        {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(detail2).email) + ' ', 1),
                            createVNode(
                              _component_n_button,
                              {
                                class: 'mt-l15',
                                type: 'primary',
                                text: '',
                                onClick:
                                  _cache[3] ||
                                  (_cache[3] = ($event) => unref(router).push('/settings/security'))
                              },
                              {
                                default: withCtx(
                                  () => _cache[11] || (_cache[11] = [createTextVNode(' 修改 ', -1)])
                                ),
                                _: 1,
                                __: [11]
                              }
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        { label: '我的昵称：' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_input,
                              {
                                placeholder: '我的昵称',
                                value: unref(detail2).nickname,
                                'onUpdate:value':
                                  _cache[4] ||
                                  (_cache[4] = ($event) => (unref(detail2).nickname = $event)),
                                maxlength: '20',
                                'show-count': ''
                              },
                              null,
                              8,
                              ['value']
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        { label: '我的性别：' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_radio_group,
                              {
                                value: unref(detail2).gender,
                                'onUpdate:value':
                                  _cache[5] ||
                                  (_cache[5] = ($event) => (unref(detail2).gender = $event)),
                                name: 'gender'
                              },
                              {
                                default: withCtx(() => [
                                  createVNode(_component_n_space, null, {
                                    default: withCtx(() => [
                                      createVNode(
                                        _component_n_radio,
                                        {
                                          key: '1',
                                          value: '1'
                                        },
                                        {
                                          default: withCtx(
                                            () =>
                                              _cache[12] ||
                                              (_cache[12] = [createTextVNode(' 男 ', -1)])
                                          ),
                                          _: 1,
                                          __: [12]
                                        }
                                      ),
                                      createVNode(
                                        _component_n_radio,
                                        {
                                          key: '2',
                                          value: '2'
                                        },
                                        {
                                          default: withCtx(
                                            () =>
                                              _cache[13] ||
                                              (_cache[13] = [createTextVNode(' 女 ', -1)])
                                          ),
                                          _: 1,
                                          __: [13]
                                        }
                                      ),
                                      createVNode(
                                        _component_n_radio,
                                        {
                                          key: '0',
                                          value: '0'
                                        },
                                        {
                                          default: withCtx(
                                            () =>
                                              _cache[14] ||
                                              (_cache[14] = [createTextVNode(' 保密 ', -1)])
                                          ),
                                          _: 1,
                                          __: [14]
                                        }
                                      )
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              },
                              8,
                              ['value']
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        { label: '我的生日：' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_date_picker,
                              {
                                'formatted-value': unref(detail2).birthday,
                                'onUpdate:formattedValue':
                                  _cache[6] ||
                                  (_cache[6] = ($event) => (unref(detail2).birthday = $event)),
                                type: 'date',
                                'value-format': 'yyyy-MM-dd'
                              },
                              null,
                              8,
                              ['formatted-value']
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        { label: '个性签名：' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_input,
                              {
                                placeholder: '编辑个签，展示我的独特态度',
                                type: 'textarea',
                                maxlength: '500',
                                'show-count': '',
                                value: unref(detail2).motto,
                                'onUpdate:value':
                                  _cache[7] ||
                                  (_cache[7] = ($event) => (unref(detail2).motto = $event)),
                                autosize: {
                                  minRows: 3,
                                  maxRows: 5
                                }
                              },
                              null,
                              8,
                              ['value']
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(_component_n_form_item, null, {
                        default: withCtx(() => [
                          createVNode(
                            _component_n_button,
                            {
                              type: 'primary',
                              onClick: onChangeDetail,
                              loading: unref(loading),
                              'text-color': '#ffffff',
                              style: { 'margin-left': '94px' }
                            },
                            {
                              default: withCtx(
                                () =>
                                  _cache[15] || (_cache[15] = [createTextVNode(' 保存修改 ', -1)])
                              ),
                              _: 1,
                              __: [15]
                            },
                            8,
                            ['loading']
                          )
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  },
                  512
                )
              ])
            ]),
            unref(cropper)
              ? (openBlock(),
                createBlock(AvatarCropper, {
                  key: 0,
                  onClose: _cache[8] || (_cache[8] = ($event) => (cropper.value = false)),
                  onSuccess: onUploadAvatar
                }))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-cbe456e6']])
export { detail as default }
