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
            }
            
            Button(role: .none) {
                selectedFood = food.shuffled().filter{
                    $0 != selectedFood
                }.first
            } label: {
                Text("告诉我！")
                    .font(.largeTitle)
                    .frame(width: 200)
            }
            .padding(.bottom, -15)

            Button(role: .none) {
                selectedFood = .none
            } label: {
                Text("重置")
                    .font(.largeTitle)
                    .frame(width: 200)
            }.buttonStyle(.bordered)
            
        }
        .padding()
        .frame(maxHeight: .infinity)
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
