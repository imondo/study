//
//  ContentView.swift
//  ExpenseTracker
//
//  Created by mondo on 2022/12/13.
//

import SwiftUI

struct ContentView: View {
    
    let food = Food.examples
    
    @State private var selectedFood: Food?
    @State private var showInfo: Bool = false
    
    var body: some View {
        ScrollView {
            VStack(spacing: 30){
                // 功能性 view
                Group {
                    if (selectedFood != .none) {
                        Text(selectedFood!.image)
                            .font(.system(size: 200))
                            // 文字缩略显示
                            .minimumScaleFactor(0.7)
                            .lineLimit(1)
                    } else {
                        Image("dinner")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                    }
                }.frame(height: 250)
                
                Text("今天吃什么？")
                    .font(.title)
                    .bold()
                
                if selectedFood?.name != .none {
                    HStack {
                        Text(selectedFood?.name ?? "")
                            .font(.largeTitle)
                            .bold()
                            .foregroundColor(.green)
                            .id(selectedFood?.name)
                            .transition(.asymmetric(
                                insertion: .opacity
                                            .animation(.easeInOut(duration: 0.5).delay(0.2)),
                                removal: .opacity
                                        .animation(.easeInOut(duration: 0.4))
                            ))
                        
                        Button(action: {
                            showInfo = true
                        }, label: {
                            Image(systemName: "info.circle.fill").foregroundColor(.secondary)
                        }).buttonStyle(.plain)
                    }
                    
                    Text("热量 \(selectedFood!.calorie.formatted()) 大卡").font(.title2)
                    
                    VStack{
                        if showInfo {
                            HStack {
                                VStack(spacing: 12) {
                                    Text("蛋白质")
                                    Text(selectedFood!.protein.formatted() + " g")
                                }
                                
                                Divider().frame(width: 1).padding(.horizontal)
                                
                                VStack(spacing: 12) {
                                    Text("脂肪")
                                    Text(selectedFood!.fat.formatted() + " g")
                                }
                                
                                Divider().frame(width: 1).padding(.horizontal)
                                
                                VStack(spacing: 12) {
                                    Text("碳水")
                                    Text(selectedFood!.carb.formatted() + " g")
                                }
                            }
                            .font(.title3)
                            .padding(.horizontal)
                            .padding()
                            .background(RoundedRectangle(cornerRadius: 8).foregroundColor(Color(.systemBackground)))
                            // 从顶部开始弹出动画
                            .transition(.move(edge: .top).combined(with: .opacity))
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .clipped()
                    
                }
                
                // 撑满空间 优先度
                Spacer().layoutPriority(1)
                
                Button(role: .none) {
                    selectedFood = food.shuffled().filter{
                        $0 != selectedFood
                    }.first
                } label: {
                    Text(selectedFood != .none ? "换一个" : "告诉我！").frame(width: 200)
                        .animation(.none, value: selectedFood)
                        .transformEffect(.identity)
                }
                .padding(.bottom, -15)

                Button(role: .none) {
                    selectedFood = .none
                    showInfo = false
                } label: {
                    Text("重置").frame(width: 200)
                        
                }.buttonStyle(.bordered)
                
            }
            .padding()
            .frame(maxWidth: .infinity, minHeight: UIScreen.main.bounds.height - 150)
            .font(.largeTitle)
            .buttonStyle(.borderedProminent)
            .buttonBorderShape(.capsule)
            .controlSize(.large)
            .animation(.spring(dampingFraction: 0.55), value: showInfo)
            .animation(.easeInOut, value: selectedFood)
        }.background(Color(.secondarySystemBackground))
    }
}

extension ContentView {
    init(selectedFood: Food) {
        _selectedFood = State(wrappedValue: selectedFood)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(selectedFood: .examples.first!)
    }
}
