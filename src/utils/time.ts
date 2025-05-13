let tz: string | undefined = process.env.TIMEZONE;

if (!tz)
    tz = 'Asia/Ho_Chi_Minh';

export const time: Time.GetTime = (format = 'HH:mm:ss DD/MM/YYYY dddd', locale = 'vi-VN', timezone = tz, timestamp = Date.now(), options: Time.Options = {}): string => {
    const date: Date = timestamp instanceof Date ? timestamp : new Date(timestamp);

    const time: Array<Intl.DateTimeFormatPart> = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        hour12: options.hour12 ?? false,
        year: options.year ?? 'numeric',
        month: options.month ?? '2-digit',
        day: options.day ?? '2-digit',
        hour: options.hour ?? '2-digit',
        minute: options.minute ?? '2-digit',
        second: options.second ?? '2-digit',
        weekday: options.weekday ?? 'long'
    }).formatToParts(date);

    return format.replace(/HH|mm|ss|DD|MM|YYYY|ms|dddd/g, (key: string): string => {
        switch (key) {
            case 'HH':
                return time.find(part => part.type === 'hour')?.value ?? '00';
            case 'mm':
                return time.find(part => part.type === 'minute')?.value ?? '00';
            case 'ss':
                return time.find(part => part.type === 'second')?.value ?? '00';
            case 'ms':
                return String(date.getMilliseconds()).padStart(3, '0');
            case 'DD':
                return time.find(part => part.type === 'day')?.value ?? '00';
            case 'MM':
                return time.find(part => part.type === 'month')?.value ?? '00';
            case 'YYYY':
                return time.find(part => part.type === 'year')?.value ?? '0000';
            case 'dddd':
                return time.find(part => part.type === 'weekday')?.value ?? 'null';
            default:
                return key;
        }
    });
}

export default time;