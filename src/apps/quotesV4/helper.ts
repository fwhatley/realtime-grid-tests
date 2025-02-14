
const stockSymbols = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "FB", "BRK.B", "JNJ", "V",
  "PG", "JPM", "UNH", "HD", "MA", "DIS", "PYPL", "NFLX", "ADBE", "INTC",
  "CMCSA", "KO", "PEP", "PFE", "XOM", "ABT", "CSCO", "MRK", "NKE", "T",
  "ORCL", "LLY", "MCD", "CRM", "ACN", "AMD", "HON", "IBM", "AVGO", "TXN",
  "COST", "BA", "WMT", "TMO", "LOW", "CVX", "MDT", "UNP", "NEE", "BMY",
  "QCOM", "LIN", "SBUX", "GS", "DHR", "NOW", "INTU", "CAT", "SPGI", "ISRG",
  "MO", "DUK", "ZTS", "TGT", "BLK", "ADP", "PLD", "CB", "DE", "AMT",
  "CI", "C", "MMM", "AXP", "VRTX", "SCHW", "SO", "PGR", "GILD", "LRCX",
  "FIS", "MU", "TJX", "MDLZ", "USB", "PNC", "REGN", "FISV", "CL", "EQIX",
  "ICE", "EL", "ECL", "CSX", "NSC", "MMC", "GM", "ITW", "WM", "ADI",
  "ADI", "HUM", "BSX", "ILMN", "MCO", "SHW", "ADSK", "EMR", "TRV", "SYK",
  "TFC", "CME", "AON", "FDX", "SNPS", "ROP", "AIG", "KLAC", "MS", "ALL",
  "D", "APH", "MET", "NOC", "DXCM", "A", "ATVI", "MAR", "IDXX", "CTSH",
  "CDNS", "EBAY", "EXC", "WELL", "LMT", "ORLY", "COO", "BK", "KMB", "RSG",
  "CNC", "AEP", "DOW", "STZ", "PAYX", "HCA", "O", "XEL", "CMG", "MTD",
  "SIVB", "FTNT", "VRSK", "KMI", "PPG", "TWTR", "ED", "EIX", "IQV", "AZO",
  "ANSS", "HIG", "GWW", "VLO", "HAL", "PCAR", "DLR", "FANG", "SRE", "SPG",
  "PSA", "CTAS", "NSP", "CDW", "WEC", "ZBRA", "KEYS", "EFX", "MTCH", "MKC",
  "LEN", "TDG", "FAST", "AFL", "WMB", "CINF", "GLW", "ROK", "DHI", "MCHP",
  "ALGN", "PXD", "TER", "FLT", "WST", "WY", "CPRT", "AVB", "VMC", "NDAQ",
  "STE", "CHRW", "PRU", "HSIC", "FTV", "EXR", "BALL", "DOV", "JBHT", "ZBH",
  "IEX", "AEE", "RMD", "FMC", "WHR", "OTIS", "MLM", "ES", "PH", "HOLX",
  "BRO", "CTVA", "TTWO", "XYL", "FE", "VTRS", "EPAM", "CBOE", "TYL", "CAG",
  "NVR", "COF", "MAS", "HES", "LKQ", "BAX", "TSN", "MOH", "WRB", "UAL",
  "AES", "IR", "J", "JCI", "GPC", "BIO", "CE", "BBY", "RJF", "PWR",
  "DRE", "TROW", "CRL", "FRT", "L", "NUE", "STT", "TXT", "GPN", "ABC",
  "CMS", "CCL", "NWL", "DGX", "MGM", "HAS", "UAL", "RHI", "AOS", "NI",
  "HRL", "BXP", "OMC", "PKG", "IP", "XRAY", "WAB", "WRK", "AAP", "CNP",
  "HWM", "CHD", "GL", "MKTX", "RE", "HII", "NRG", "VTR", "BF.B", "SEE",
  "AIZ", "PNR", "LDOS", "JBL", "PFG", "CFG", "DRI", "CZR", "LNT", "ALLE",
  "OGN", "FOXA", "JKHY", "NWSA", "HOLX", "ROL", "TFX", "PNW", "MASI", "TECH",
  "UHS", "IPG", "MTB", "JKHY", "TYL", "LNC", "LXP", "REG", "BEN", "CF",
  "RHI", "LUV", "CPT", "ZION", "PFG", "EVRG", "VFC", "HPQ", "STLD", "KEY",
  "PEAK", "TRGP", "MRO", "DVA", "APA", "GL", "AVY", "CTRA", "LKQ", "RJF",
  "QRVO", "NDSN", "GNRC", "HOG", "NLOK", "CDAY", "LVS", "FND", "UDR", "BWA",
  "PENN", "BALL", "MKC", "HFC", "ATO", "LEG", "FLS", "DISH", "OGN", "MOS"
];

export function getQuoteGridData(price: number = 1.0) {
  return stockSymbols.slice(0, 30).map((symbol) => createQuote(symbol, price))
}


export default function createQuote(symbol, price) {
  symbol = symbol.toUpperCase() || 'AAPL'
  return {
    symbol: symbol,
    open: price,
    openPriceDisplay: price,
    high: price,
    highPriceDisplay: price,
    low: price,
    lowPriceDisplay: price,
    previousClose: price,
    previousClosePriceDisplay: price,
    last: price,
    lastPriceDisplay: price,
    lastSize: price,
    ask: price,
    askPriceDisplay: price,
    askSize: price,
    bid: price,
    bidPriceDisplay: price,
    bidSize: price,
    netChange: price,
    netChangePct: Math.random(),
    high52Week: price,
    high52WeekPriceDisplay: price,
    low52Week: price,
    low52WeekPriceDisplay: price,
  }
}