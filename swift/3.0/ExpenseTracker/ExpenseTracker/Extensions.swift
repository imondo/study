//
//  Extensions.swift
//  ExpenseTracker
//
//  Created by mondo on 2022/12/27.
//

import SwiftUI

extension View {
    func mainButtonStyle() -> some View {
        buttonStyle(.borderedProminent)
        .buttonBorderShape(.capsule)
        .controlSize(.large)
    }
    
    func roundedRectBackground(radius: CGFloat = 8, fill: some ShapeStyle = Color.bg) -> some View {
        background(RoundedRectangle(cornerRadius: radius).foregroundStyle(fill))
    }
}

extension Animation {
    static let mySpring = Animation.spring(dampingFraction: 0.55)
    static let myEase = Animation.easeInOut(duration: 0.6)
}

extension Color {
    static let bg = Color(.systemBackground)
    static let bg2 = Color(.secondarySystemBackground)
}

extension AnyTransition {
    
    static let moveUpWithOpactiy = Self.move(edge: .top).combined(with: .opacity)
    
    // 进场和离场动画 进场比离场延迟 0.2s
    static let delayInsertionOpactiy = Self.asymmetric(
        insertion: .opacity
                    .animation(.easeInOut(duration: 0.5).delay(0.2)),
        removal: .opacity
                .animation(.easeInOut(duration: 0.4))
    )
}

