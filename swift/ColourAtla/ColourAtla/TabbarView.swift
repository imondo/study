//
//  TabbarView.swift
//  ColourAtla
//
//  Created by mondo on 2022/12/28.
//

import SwiftUI

struct TabbarView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            ContentView().tabItem {
                if self.selectedTab == 0 {
                    Image(systemName: "house")
                } else {
                    Image(systemName: "house.fill")
                }
                Text("首页")
            }.tag(0)
            
            MineView().tabItem{
                if self.selectedTab == 1 {
                    Image(systemName: "person")
                } else {
                    Image(systemName: "person.fill")
                }
                Text("我的")
            }.tag(1)
        }
        .accentColor(Color.Hex(0x409EFF))
    }
}

struct TabbarView_Previews: PreviewProvider {
    static var previews: some View {
        TabbarView()
    }
}
