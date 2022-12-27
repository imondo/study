//
//  ContentView.swift
//  ExpenseTracker
//
//  Created by mondo on 2022/12/13.
//

import SwiftUI

struct ContentView: View {
    @State private var selectedFood: Food?
    @State private var showInfo: Bool = false
    
    let food = Food.examples
    
    var body: some View {
        ScrollView {
            VStack(spacing: 30){
                
                foodImage
                
                Text("今天吃什么？").bold()
                
                selectedFoodInfoView
                
                // 撑满空间 优先度
                Spacer().layoutPriority(1)
                
                selectFoodButton

                cancelFoodButton
                
            }
            .padding()
            .frame(maxWidth: .infinity, minHeight: UIScreen.main.bounds.height - 150)
            .font(.largeTitle)
            .mainButtonStyle()
            .animation(.mySpring, value: showInfo)
            .animation(.myEase, value: selectedFood)
        }.background(Color.bg2)
    }
}

// MARK: - SubViews
private extension ContentView {
    var foodImage: some View {
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
        
    }
    
    var foodNameView: some View {
        HStack {
            Text(selectedFood?.name ?? "")
                .font(.largeTitle)
                .bold()
                .foregroundColor(.green)
                .id(selectedFood?.name)
                .transition(.delayInsertionOpactiy)
            
            Button(action: {
                showInfo = true
            }, label: {
                Image(systemName: "info.circle.fill").foregroundColor(.secondary)
            }).buttonStyle(.plain)
        }
    }
    
    var foodDetailView: some View {
        VStack{
            if showInfo {
                HStack {
                    VStack(spacing: 12) {
                        Text("蛋白质")
                        Text(selectedFood!.$protein)
                    }
                    
                    Divider().frame(width: 1).padding(.horizontal)
                    
                    VStack(spacing: 12) {
                        Text("脂肪")
                        Text(selectedFood!.$fat)
                    }
                    
                    Divider().frame(width: 1).padding(.horizontal)
                    
                    VStack(spacing: 12) {
                        Text("碳水")
                        Text(selectedFood!.$carb)
                    }
                }
                .font(.title3)
                .padding(.horizontal)
                .padding()
                .roundedRectBackground()
                
                // 从顶部开始弹出动画
                .transition(.moveUpWithOpactiy)
            }
        }
        .frame(maxWidth: .infinity)
        .clipped()
    }
    
    @ViewBuilder var selectedFoodInfoView: some View {
        if selectedFood?.name != .none {
            
            foodNameView
            
            Text("热量 \(selectedFood!.$calorie)").font(.title2)
            
            foodDetailView
        }
    }
    
    var selectFoodButton: some View {
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
    }
    
    var cancelFoodButton: some View {
        Button(role: .none) {
            selectedFood = .none
            showInfo = false
        } label: {
            Text("重置").frame(width: 200)
        }.buttonStyle(.bordered)
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
