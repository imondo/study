//
//  ContentView.swift
//  ColourAtla
//
//  Created by mondo on 2022/12/28.
//

import SwiftUI

struct ContentView: View {
    @State var cardItems: [CardModel] = []
    @State var search = ""
    @State var showSearchBar = false
    
    var body: some View {
        VStack {
            SwitchSearchBar
            
            if cardItems.isEmpty {
                Spacer()
                LoadingView()
                Spacer()
            } else {
                CardListView
            }
        }
        .padding()
        .onAppear(perform: {
            getColors()
        })
    }
    
    // MARK: 色卡列表视图
    private var CardListView: some View {
        ScrollView(.vertical, showsIndicators: false, content: {
            ForEach(cardItems, id: \.cardColorRBG) { item in
                VStack(spacing: 20) {
                    CardViewExamples(cardBGColor: Color.Hex(item.cardBGColor), cardColorName: item.cardColorName, cardColorRBG: item.cardColorRBG)
                }
            }
        })
    }
    
    // MARK: 搜索
    private var SearchBarView: some View {
        TextField("搜索颜色值", text: $search)
            .padding(7)
            .padding(.horizontal, 25)
            .background(Color(.systemGray6))
            .cornerRadius(8)
            .overlay(
                Image(systemName: "magnnifyingglass")
                    .foregroundColor(.gray)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                    .padding(.leading, 8)
            )
            .padding(.horizontal, 10)
            .onChange(of: search, perform: { _ in
                if search != "" {
                    searchColor()
                } else {
                    search = ""
                    getColors()
                }
            })
        
    }
    
    // MARK: 搜索切换
    private var SwitchSearchBar: some View {
        HStack {
            if showSearchBar {
                SearchBarView
                CloseButtonView
            } else {
                CardTitleView
                Spacer()
                SearchButtonView
            }
        }
        .padding(.top, 20)
        .padding(.bottom, 10)
        .padding(.horizontal)
        .zIndex(1)
    }
    
    // MARK: 搜索 icon
    private var SearchButtonView: some View {
        Button(action: {
            withAnimation(.easeOut) {
                showSearchBar.toggle()
            }
        }) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 20, weight: .bold))
                .foregroundColor(.gray)
        }
    }
    
    // MARK: 取消按钮
    private var CloseButtonView: some View {
        Button(action: {
            withAnimation(.easeOut) {
                search = ""
                getColors()
                showSearchBar.toggle()
            }
        }, label: {
            Text("取消").foregroundColor(.gray)
        })
    }
    
    // MARK：搜索方法
    func searchColor() {
        let query = search.lowercased()
        DispatchQueue.global(qos: .background).async {
            let filter = cardItems.filter {
                $0.cardColorRBG.lowercased().contains(query)
            }
            DispatchQueue.main.async {
                self.cardItems = filter
            }
        }
    }
    
    // MARK: 网络请求
    func getColors() {
        let JsonURL = "https://api.npoint.io/dc5a1718e0e958613ade"
        let sessionn = URLSession(configuration: .default)
        sessionn.dataTask(with: URL(string: JsonURL)!) {
            data, _, _ in guard let jsonData = data else { return }
            do {
                let colors = try JSONDecoder().decode([CardModel].self, from: jsonData)
                self.cardItems = colors
            } catch {
                print(error)
            }
        }.resume()
    }
}

// MARK: 标题
private var CardTitleView: some View {
    Text("世界上最高级的颜色").font(.system(size: 17)).fontWeight(.bold)
}

// MARK: 卡片视图
struct CardViewExamples: View {
    var cardBGColor: Color
    var cardColorName: String
    var cardColorRBG: String
    
    var body: some View {
        ZStack(alignment: Alignment(horizontal: .center, vertical: .center)) {
            // 背景卡片
            Rectangle()
                .fill(cardBGColor)
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: 110)
                .cornerRadius(8)
            
            HStack {
                VStack(alignment: .leading, spacing: 10) {
                    Text(cardColorName)
                        .fontWeight(.bold)
                        .foregroundColor(Color.white)
                        .font(.system(size: 17))
                    Text(cardColorRBG)
                        .fontWeight(.bold)
                        .foregroundColor(Color.white)
                        .font(.system(size: 14))
                }
                Spacer()
            }.padding()
        }
        // 长按复制颜色值
        .contextMenu {
            Button(action: {
                UIPasteboard.general.string = cardColorName
            }, label: {
                Text("复制颜色")
            })
        }.padding(.horizontal)
    }
}



struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
