module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: ['Android >= 4.0', 'iOS >= 7']
        },
        'postcss-pxtorem': {
            rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: ['*'],
            unitPrecision: 5, //保留rem小數點多少位
            //selectorBlackList: ['.radius'],  //則是一個對css選擇器進行過濾的陣列，比如你設定為['fs']，那例如fs-xl類名，裡面有關px的樣式將不被轉換，這裡也支援正則寫法。
            replace: true, //這個真不知到幹嘛用的。有知道的告訴我一下
            mediaQuery: false, //媒體查詢( @media screen 之類的)中不生效
            minPixelValue: 0, //px小於12的不會被轉換
            exclude: /node_modules/i
        }
    }
}
