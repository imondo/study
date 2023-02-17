//
//  ContentView.swift
//  ExpenseTracker
//
//  Created by mondo on 2022/12/13.
//

import SwiftUI

struct ContentView: View {
    
    let food = ["汉堡", "沙拉", "披萨", "意大利面", "鸡腿便当", "刀削面", "火锅", "牛肉面", "关东煮"]
    
    @State private var selectedFood: String?
    
    var body: some View {
        VStack(spacing: 30){
            Image("dinner")
                .resizable()
                .aspectRatio(contentMode: .fit)
            
            Text("今天吃什么？")
                .font(.title)
                .bold()
            
            if selectedFood != .none {
                Text(selectedFood ?? "")
                    .font(.largeTitle)
                    .bold()
                    .foregroundColor(.green)
                    .id(selectedFood)
                    .transition(.asymmetric(
                        insertion: .opacity
                                    .animation(.easeInOut(duration: 0.5).delay(0.2)),
                        removal: .opacity
                                .animation(.easeInOut(duration: 0.4))
                    ))
            }
            
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
            } label: {
                Text("重置").frame(width: 200)
                    
            }.buttonStyle(.bordered)
            
        }
        .padding()
        .frame(maxHeight: .infinity)
        .font(.largeTitle)
        .background(Color(.secondarySystemBackground))
        .buttonStyle(.borderedProminent)
        .buttonBorderShape(.capsule)
        .controlSize(.large)
        .animation(.easeInOut, value: selectedFood)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
