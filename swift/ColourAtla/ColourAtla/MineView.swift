//
//  MineView.swift
//  ColourAtla
//
//  Created by mondo on 2022/12/28.
//

import SwiftUI

struct MineView: View {
    var body: some View {
        NavigationView {
            Form {
                 Section {
                     Text("访问官网")
                     Text("隐私政策")
                     Text("用户协议")
                 }
                 
                Section {
                     Text("前往AppStore")
                     Text("用户反馈")
                     Text("关于我们")
                 }
             }
        }
        .navigationBarTitle("设置", displayMode: .inline)
    }
}

struct MineView_Previews: PreviewProvider {
    static var previews: some View {
        MineView()
    }
}
